import {Stack, Title, FileInput, Group, Loader, Alert} from '@mantine/core';
import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {useState} from 'react';

import {useDataStore} from '../data-store';
import {readFile} from '../messages/readFile';
import type {WorkerStatuses} from '../worker/WorkerMessageTypes';

function Index() {
	const setInfo = useDataStore((state) => state.setGameInfo);

	const navigate = useNavigate({from: '/'});

	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	const [errorDetails, setErrorDetails] = useState<Error | null>(null);

	async function processFile(file: File) {
		console.log('Starting...');

		setStatus('LOADING');
		setErrorDetails(null);

		const bytes = await file.bytes();
		readFile(bytes, (response) => {
			setStatus(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED':
					setInfo(response.result.info);
					void navigate({to: '/general-info'});
					break;

				case 'ERROR':
					console.error(response.errorDetails);
					setErrorDetails(new Error(response.errorDetails));
					break;

				default:
					break;
			}
		});
	}

	return (
		<Stack>
			<Title>UndertaleModTool on the Web</Title>

			<FileInput
				label="Select GameMaker data file (.win, .unx, .ios, .droid, audiogroup*.dat)"
				disabled={status === 'LOADING' || status === 'PROCESSING'}
				onChange={(file) => {
					if (file) {
						void processFile(file);
					}
				}}
				placeholder="Select file..."
			/>

			{status === 'LOADING' ? (
				<Group>
					<strong>Loading UndertaleModTool...</strong>
					<Loader size="sm" />
				</Group>
			) : status === 'PROCESSING' ? (
				<Group>
					<strong>Loading game data...</strong>
					<Loader size="sm" />
				</Group>
			) : status === 'ERROR' ? (
				<Alert
					variant="light"
					color="red"
					title="Oops, there was a problem processing this file"
				>
					{errorDetails ? <code>{errorDetails.message}</code> : null}
				</Alert>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/')({
	component: Index,
});
