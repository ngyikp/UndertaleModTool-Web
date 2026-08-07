import {Button} from '@mantine/core';
import {useState} from 'react';

import {saveDataFile} from '../messages/saveDataFile';
import type {WorkerStatuses} from '../worker/WorkerMessageTypes';

export default function SaveDataFile() {
	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	// const [error, setError] = useState<Error | null>(null);

	function process() {
		console.log('Saving the data file...');

		setStatus('LOADING');
		// setError(null);

		saveDataFile((response) => {
			setStatus(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED':
					{
						const blobUrl = window.URL.createObjectURL(
							new Blob([response.result]),
						);

						const link = document.createElement('a');
						link.setAttribute('href', blobUrl);
						// todo reuse file name used on initial load
						link.setAttribute('download', 'edited.win');
						link.click();
						link.remove();
						window.URL.revokeObjectURL(blobUrl);
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
