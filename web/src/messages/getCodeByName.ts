import {sendMessageToWorker} from '../worker/worker-handler';
import type {SpecificWorkerResponses} from '../worker/WorkerMessageTypes';

export type GetCodeByNameType = {type: 'getCodeByName'; name: string};

export type GetCodeByNameResult = {
	decompiledCode: string;
};

export function getCodeByName(
	name: string,
	onStatusChanged: (
		response: SpecificWorkerResponses<GetCodeByNameResult>,
	) => void,
) {
	sendMessageToWorker(
		{
			type: 'getCodeByName',
			name,
		},
		onStatusChanged,
	);
}
