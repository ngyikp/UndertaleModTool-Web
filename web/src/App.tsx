import {useState} from 'react';
import {
	Alert,
	FileInput,
	Group,
	Loader,
	MantineProvider,
	Stack,
	Title,
} from '@mantine/core';
import {loadFile} from './worker/worker-handler';
import type {WorkerStatuses} from './worker/WorkerMessageTypes';

import '@mantine/core/styles.css';

export default function App() {
	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	const [info, setInfo] = useState<string>('');
	const [errorDetails, setErrorDetails] = useState<Error | null>(null);

	async function processFile(file: File) {
		console.log('Starting...');

		setStatus('LOADING');
		setInfo('');
		setErrorDetails(null);

		const bytes = await file.bytes();
		loadFile(bytes, (response) => {
			setStatus(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED': {
					setInfo(response.info);
					break;
				}

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
		<MantineProvider>
			<main id="main">
				<Stack>
					<Title>UndertaleModTool on the Web</Title>

					<FileInput
						label="Select GameMaker data file (.win, .unx, .ios, .droid, audiogroup*.dat)"
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
							title="Oops, there was a problem while processing this file"
						>
							{errorDetails ? (
								<>
									: <code>{errorDetails.message}</code>
								</>
							) : null}
						</Alert>
					) : null}

					<pre>{info}</pre>
				</Stack>
			</main>
		</MantineProvider>
	);
}
