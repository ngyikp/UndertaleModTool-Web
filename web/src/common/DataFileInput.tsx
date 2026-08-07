import {Alert, Button, Stack} from '@mantine/core';
import '@mantine/dropzone/styles.css';
import {Dropzone} from '@mantine/dropzone';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from '@tanstack/react-router';
import {useState} from 'react';

import {useDataStore} from '../data-store';
import {getGameInfoQueryOptions} from '../messages/getGameInfo';
import {readFile} from '../messages/readFile';
import type {WorkerStatuses} from '../worker/WorkerMessageTypes';

import BasicErrorAlert from './BasicErrorAlert';
import BasicLoadingMessage from './BasicLoadingMessage';
import ExternalLinkInNewWindow from './ExternalLinkInNewWindow';
import useUnloadGame from './useUnloadGame';

type Props = Readonly<{
	initialStatusMessage?: React.ReactNode;
	onFileLoaded?: () => void;
}>;

export default function DataFileInput({
	initialStatusMessage,
	onFileLoaded,
}: Props) {
	const setGameInfo = useDataStore((state) => state.setGameInfo);
	const setDataFileLoadInfo = useDataStore(
		(state) => state.setDataFileLoadInfo,
	);
	const unloadGame = useUnloadGame();

	const router = useRouter();
	const queryClient = useQueryClient();

	const [fileName, setFileName] = useState('');
	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [showAudioGroupError, setShowAudioGroupError] = useState(false);

	async function processFile(file: File) {
		console.log('Starting...');

		if (file.name.startsWith('audiogroup') && file.name.endsWith('.dat')) {
			setShowAudioGroupError(true);
			return;
		}

		setStatus('LOADING');
		setFileName(file.name);
		setError(null);
		setShowAudioGroupError(false);

		// If the user goes back to main page without clicking 'unload game'
		unloadGame();

		const bytes = await file.bytes();
		readFile(bytes, (response) => {
			setStatus(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED':
					setDataFileLoadInfo(response.result);

					void queryClient
						.fetchQuery(getGameInfoQueryOptions())
						.then((data) => {
							setGameInfo(data);

							// hack: router context is lagging a bit
							requestAnimationFrame(() => {
								void router.invalidate().then(onFileLoaded);
							});
						});
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
					title={
						<>
							Oops, there was a problem loading{' '}
							{fileName !== '' ? '‘' + fileName + '’' : 'this file'}.<br />
							<br />
							Make sure it is a valid GameMaker data file.
							<br />
							Try opening this file on the main Windows version of
							UndertaleModTool, if it succeeds there, then{' '}
							<ExternalLinkInNewWindow href="https://github.com/ngyikp/UndertaleModTool-Web/issues/new">
								report about this web tool incompatibility
							</ExternalLinkInNewWindow>
							.
							{import.meta.env.DEV &&
							error?.message.startsWith(
								'Failed to fetch dynamically imported module: ',
							) &&
							error.message.endsWith('/dotnet.js') ? (
								<>
									<br />
									<br />
									(DEV: Try recompiling the .NET project and reload, restarting
									the Vite dev server may also help)
								</>
							) : (
								''
							)}
						</>
					}
					error={error}
				/>
			) : null}

			{status !== 'LOADING' &&
			status !== 'PROCESSING' &&
			status !== 'FINISHED' ? (
				<Stack>
					{showAudioGroupError ? (
						<Alert title="Audio group data files are not supported yet." />
					) : status !== 'ERROR' ? (
						initialStatusMessage
					) : null}

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
							.win, .unx, .ios, .droid{/*, audiogroup*.dat*/}
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
