import {Title, FileInput, Group, Loader, Alert, Stack} from '@mantine/core';
import {useState} from 'react';

import type {GameInfoType} from '../GameInfoType';
import type {PageType} from '../PageType';
import {loadFile} from '../worker/worker-handler';
import type {WorkerStatuses} from '../worker/WorkerMessageTypes';

type Props = Readonly<{
	setInfo: (newInfo: GameInfoType | null) => void;
	setPage: (newPage: PageType) => void;
}>;

export default function WelcomePage({setInfo, setPage}: Props) {
	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	const [errorDetails, setErrorDetails] = useState<Error | null>(null);

	async function processFile(file: File) {
		console.log('Starting...');

		setStatus('LOADING');
		setInfo(null);
		setErrorDetails(null);

		const bytes = await file.bytes();
		loadFile(bytes, (response) => {
			setStatus(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED':
					setInfo(response.result.info);
					setPage('GENERAL_INFO'); // reset to first page in case this is the second time
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
