import {Button, FileButton, Stack, Title} from '@mantine/core';
import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {useState} from 'react';

import BasicErrorAlert from '../BasicErrorAlert';
import BasicLoadingMessage from '../BasicLoadingMessage';
import {useDataStore} from '../data-store';
import {readFile} from '../messages/readFile';
import type {WorkerStatuses} from '../worker/WorkerMessageTypes';

function Index() {
	const [fileName, setFileName] = useState('');
	const setInfo = useDataStore((state) => state.setGameInfo);

	const navigate = useNavigate({from: '/'});

	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	const [errorDetails, setErrorDetails] = useState<Error | null>(null);

	async function processFile(file: File) {
		console.log('Starting...');

		setStatus('LOADING');
		setFileName(file.name);
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

			{status !== 'LOADING' && status !== 'PROCESSING' ? (
				<div>
					<FileButton
						onChange={(file) => {
							if (file) {
								void processFile(file);
							}
						}}
					>
						{(props) => (
							<Button {...props}>
								Select GameMaker data file (.win, .unx, .ios, .droid,
								audiogroup*.dat)
							</Button>
						)}
					</FileButton>
				</div>
			) : null}

			{status === 'LOADING' ? (
				<BasicLoadingMessage text="Loading UndertaleModTool..." />
			) : status === 'PROCESSING' ? (
				<BasicLoadingMessage
					text={'Loading ' + (fileName !== '' ? fileName : 'game data') + '...'}
				/>
			) : status === 'ERROR' ? (
				<BasicErrorAlert
					title="Oops, there was a problem processing this file"
					error={errorDetails}
				/>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/')({
	component: Index,
});
