import type {ModelTypeKeys} from '../types/ModelType';
import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetEntriesByModelTypeRequest = {
	type: 'getEntriesByModelType';
	modelType: ModelTypeKeys;
};

export type GetEntriesByModelTypeResult = {
	list: string[];
};

export function getEntriesByModelType(modelType: ModelTypeKeys) {
	return sendMessageToWorkerAsPromise<GetEntriesByModelTypeResult>({
		type: 'getEntriesByModelType',
		modelType,
	});
}
