import {sendMessageToWorker} from '../worker/worker-handler';
import type {SpecificWorkerResponses} from '../worker/WorkerMessageTypes';

export type SaveDataFileRequest = {
	type: 'saveDataFile';
};

export type SaveDataFileResult = Uint8Array<ArrayBuffer>;

export function saveDataFile(
	onStatusChanged: (
		response: SpecificWorkerResponses<SaveDataFileResult>,
	) => void,
) {
	sendMessageToWorker(
		{
			type: 'saveDataFile',
		},
		onStatusChanged,
	);
}
