import type {ModelTypeKeys} from '../types/ModelType';
import {sendMessageToWorker} from '../worker/worker-handler';
import type {SpecificWorkerResponses} from '../worker/WorkerMessageTypes';

export type GetEntriesByModelTypeRequest = {
	type: 'getEntriesByModelType';
	modelType: ModelTypeKeys;
};

export type GetEntriesByModelTypeResult = {
	list: string[];
};

export function getEntriesByModelType(
	modelType: ModelTypeKeys,
	onStatusChanged: (
		response: SpecificWorkerResponses<GetEntriesByModelTypeResult>,
	) => void,
) {
	sendMessageToWorker(
		{
			type: 'getEntriesByModelType',
			modelType,
		},
		onStatusChanged,
	);
}
