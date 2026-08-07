import {Button, Modal, Text} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useRef, useState} from 'react';

import BasicErrorAlert from '../common/BasicErrorAlert';
import BasicLoadingMessage from '../common/BasicLoadingMessage';
import {deleteDataFile} from '../messages/deleteDataFile';
import {saveDataFile} from '../messages/saveDataFile';
import type {WorkerStatuses} from '../worker/WorkerMessageTypes';

export default function SaveDataFile() {
	const [opened, {open: openModal, close: closeModal}] = useDisclosure(false, {
		onClose() {
			saveSessionIdRef.current = 0;
		},
	});
	const saveSessionIdRef = useRef(0);

	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	const [loadingDetail, setLoadingDetail] = useState('');
	const [error, setError] = useState<Error | null>(null);

	function process() {
		console.log('Saving the data file...');

		openModal();
		const currentSessionId = Date.now();
		saveSessionIdRef.current = currentSessionId;

		setStatus('LOADING');
		setError(null);

		const tempFileName = 'edited.win';
		saveDataFile(tempFileName, (response) => {
			if (response.status !== 'MESSAGE_FROM_DOTNET') {
				setStatus(response.status);
			}

			switch (response.status) {
				case 'MESSAGE_FROM_DOTNET':
					setLoadingDetail(response.result);
					console.log(response.result);
					break;

				case 'FINISHED':
					{
						// If the user closes the dialog before the save is finished,
						// we don't offer the save
						if (saveSessionIdRef.current === currentSessionId) {
							// todo consider using StreamSaver.js to stream contents
							const blobUrl = window.URL.createObjectURL(
								new Blob([response.result]),
							);

							const link = document.createElement('a');
							link.setAttribute('href', blobUrl);
							// todo reuse file name used on initial load
							link.setAttribute('download', 'data.win');
							link.click();
							link.remove();
							window.URL.revokeObjectURL(blobUrl);

							closeModal();
						}

						deleteDataFile(tempFileName).catch((error: unknown) => {
							console.error(error);
						});
					}
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
			<Button
				onClick={process}
				disabled={status === 'LOADING' || status === 'PROCESSING'}
			>
				Save game
			</Button>

			<Modal
				opened={opened}
				onClose={closeModal}
				title={
					status === 'ERROR' ? (
						'Save error'
					) : (
						<BasicLoadingMessage text="Saving game..." />
					)
				}
			>
				{status === 'ERROR' ? (
					<BasicErrorAlert
						title="Oops, there was a problem saving the game."
						error={error}
					/>
				) : (
					<Text c="dimmed">
						{loadingDetail !== '' ? loadingDetail : <>&nbsp;</>}
					</Text>
				)}
			</Modal>
		</>
	);
}
