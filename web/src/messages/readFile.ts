import {sendMessageToWorker} from '../worker/worker-handler';
import type {SpecificWorkerResponses} from '../worker/WorkerMessageTypes';

import type {DataFileLoadInfoType} from './getDataFileLoadInfo';

export type ReadFileRequest = {
	type: 'readFile';
	fileName: string;
	bytes: Uint8Array<ArrayBuffer>;
};

export type ReadFileResult = DataFileLoadInfoType;

export function readFile(
	fileName: string,
	bytes: Uint8Array<ArrayBuffer>,
	onStatusChanged: (response: SpecificWorkerResponses<ReadFileResult>) => void,
) {
	sendMessageToWorker(
		{
			type: 'readFile',
			fileName,
			bytes,
		},
		onStatusChanged,
	);
}
