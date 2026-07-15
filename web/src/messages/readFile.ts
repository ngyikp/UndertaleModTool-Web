import type {GameInfoType} from '../types/GameInfoType';
import {sendMessageToWorker} from '../worker/worker-handler';
import type {SpecificWorkerResponses} from '../worker/WorkerMessageTypes';

export type ReadFileRequest = {
	type: 'readFile';
	bytes: Uint8Array<ArrayBuffer>;
};

export type ReadFileResult = {
	info: GameInfoType;
};

export function readFile(
	bytes: Uint8Array<ArrayBuffer>,
	onStatusChanged: (response: SpecificWorkerResponses<ReadFileResult>) => void,
) {
	sendMessageToWorker(
		{
			type: 'readFile',
			bytes,
		},
		onStatusChanged,
	);
}
