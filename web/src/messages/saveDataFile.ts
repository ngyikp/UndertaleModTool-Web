import {sendMessageToWorker} from '../worker/worker-handler';
import type {SpecificWorkerResponses} from '../worker/WorkerMessageTypes';

export type SaveDataFileRequest = {
	type: 'saveDataFile';
	fileName: string;
};

export type SaveDataFileResult = Uint8Array<ArrayBuffer>;

export function saveDataFile(
	fileName: string,
	onStatusChanged: (
		response: SpecificWorkerResponses<SaveDataFileResult>,
	) => void,
) {
	sendMessageToWorker(
		{
			type: 'saveDataFile',
			fileName,
		},
		onStatusChanged,
	);
}
