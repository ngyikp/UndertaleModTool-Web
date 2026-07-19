import {Button, Stack} from '@mantine/core';
import '@mantine/dropzone/styles.css';
import {Dropzone} from '@mantine/dropzone';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from '@tanstack/react-router';
import {useState} from 'react';

import {useDataStore} from '../data-store';
import {readFile} from '../messages/readFile';
import type {WorkerStatuses} from '../worker/WorkerMessageTypes';

import BasicErrorAlert from './BasicErrorAlert';
import BasicLoadingMessage from './BasicLoadingMessage';

const noop = () => {};

type Props = Readonly<{
	onFileLoaded?: () => void;
	onStatusChanged?: (newStatus: WorkerStatuses) => void;
}>;

export default function DataFileInput({
	onFileLoaded,
	onStatusChanged = noop,
}: Props) {
	const setInfo = useDataStore((state) => state.setGameInfo);

	const router = useRouter();
	const queryClient = useQueryClient();

	const [fileName, setFileName] = useState('');
	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	const [error, setError] = useState<Error | null>(null);

	async function processFile(file: File) {
		console.log('Starting...');

		setStatus('LOADING');
		onStatusChanged('LOADING');
		setFileName(file.name);
		setError(null);

		const bytes = await file.bytes();
		readFile(bytes, (response) => {
			setStatus(response.status);
			onStatusChanged(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED':
					setInfo(response.result.info);

					// Execution order is important, or else gameInfo context in router doesn't update
					void queryClient
						.invalidateQueries()
						.then(() => {
							return router.invalidate();
						})
						.then(onFileLoaded);
					break;

				case 'ERROR':
					console.error(response.errorDetails);
					setError(new Error(response.errorDetails));
					break;

				default:
					break;
			}
		});
	}

	return (
		<>
			{status === 'LOADING' ? (
				<BasicLoadingMessage text="Loading UndertaleModTool..." />
			) : status === 'PROCESSING' ? (
				<BasicLoadingMessage
					text={'Loading ' + (fileName !== '' ? fileName : 'game data') + '...'}
				/>
			) : status === 'ERROR' ? (
				<BasicErrorAlert
					title="Oops, there was a problem loading this file. Make sure it is a valid GameMaker data file."
					error={error}
				/>
			) : null}

			{status !== 'LOADING' &&
			status !== 'PROCESSING' &&
			status !== 'FINISHED' ? (
				<Stack>
					<Dropzone
						multiple={false}
						onDrop={(files) => {
							const file = files[0];
							if (file) {
								void processFile(file);
							}
						}}
					>
						<Stack justify="center" mih={125} style={{textAlign: 'center'}}>
							<div>
								<Button>Select GameMaker data file</Button>
							</div>
							.win, .unx, .ios, .droid, audiogroup*.dat
						</Stack>
					</Dropzone>

					<p>
						All files are processed locally inside your browser, nothing is sent
						off to another server.
					</p>
				</Stack>
			) : null}
		</>
	);
}
