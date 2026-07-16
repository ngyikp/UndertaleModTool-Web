import {Button, FileButton} from '@mantine/core';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from '@tanstack/react-router';
import {useState} from 'react';

import BasicErrorAlert from '../BasicErrorAlert';
import BasicLoadingMessage from '../BasicLoadingMessage';
import {useDataStore} from '../data-store';
import {readFile} from '../messages/readFile';
import type {WorkerStatuses} from '../worker/WorkerMessageTypes';

type Props = Readonly<{
	onFileLoaded?: () => void;
}>;

export default function DataFileInput({onFileLoaded}: Props) {
	const setInfo = useDataStore((state) => state.setGameInfo);

	const router = useRouter();
	const queryClient = useQueryClient();

	const [fileName, setFileName] = useState('');
	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	const [error, setError] = useState<Error | null>(null);

	async function processFile(file: File) {
		console.log('Starting...');

		setStatus('LOADING');
		setFileName(file.name);
		setError(null);

		const bytes = await file.bytes();
		readFile(bytes, (response) => {
			setStatus(response.status);

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
			{status !== 'LOADING' &&
			status !== 'PROCESSING' &&
			status !== 'FINISHED' ? (
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
					title="Oops, there was a problem loading this file. Make sure it is a valid GameMaker data file."
					error={error}
				/>
			) : null}
		</>
	);
}
