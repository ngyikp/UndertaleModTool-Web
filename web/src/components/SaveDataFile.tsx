import {Button} from '@mantine/core';
import {useState} from 'react';

import {deleteDataFile} from '../messages/deleteDataFile';
import {saveDataFile} from '../messages/saveDataFile';
import type {WorkerStatuses} from '../worker/WorkerMessageTypes';

export default function SaveDataFile() {
	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	// const [error, setError] = useState<Error | null>(null);

	function process() {
		console.log('Saving the data file...');

		setStatus('LOADING');
		// setError(null);

		const tempFileName = 'edited.win';
		saveDataFile(tempFileName, (response) => {
			setStatus(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED':
					{
						// todo consider using StreamSaver.js to stream contents
						const blobUrl = window.URL.createObjectURL(
							new Blob([response.result]),
						);

						const link = document.createElement('a');
						link.setAttribute('href', blobUrl);
						// todo reuse file name used on initial load
						link.setAttribute('download', tempFileName);
						link.click();
						link.remove();
						window.URL.revokeObjectURL(blobUrl);

						deleteDataFile(tempFileName).catch((error: unknown) => {
							console.error(error);
						});
					}
					break;

				case 'ERROR':
					// todo show error, in dialog maybe?
					console.error(response.errorDetails);
					// setError(new Error(response.errorDetails));
					break;

				default:
					break;
			}
		});
	}

	return (
		<Button
			onClick={process}
			loading={status === 'LOADING' || status === 'PROCESSING'}
		>
			Save game
		</Button>
	);
}
