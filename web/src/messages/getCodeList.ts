import {sendMessageToWorker} from '../worker/worker-handler';
import type {SpecificWorkerResponses} from '../worker/WorkerMessageTypes';

export type GetCodeListType = {type: 'getCodeList'};

export type GetCodeListResult = {
	list: string[];
};

export function getCodeList(
	onStatusChanged: (
		response: SpecificWorkerResponses<GetCodeListResult>,
	) => void,
) {
	sendMessageToWorker(
		{
			type: 'getCodeList',
		},
		onStatusChanged,
	);
}
