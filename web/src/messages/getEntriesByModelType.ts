import {z} from 'zod/mini';

import type {ModelTypeKeys} from '../types/ModelType';
import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetEntriesByModelTypeRequest = {
	type: 'getEntriesByModelType';
	modelType: ModelTypeKeys;
};

export type GetEntriesByModelTypeResult = {
	list: EntriesListType;
};

export const EntriesListInfoSchema = z.array(z.string());

type EntriesListType = z.infer<typeof EntriesListInfoSchema>;

export function getEntriesByModelType(modelType: ModelTypeKeys) {
	return sendMessageToWorkerAsPromise<GetEntriesByModelTypeResult>({
		type: 'getEntriesByModelType',
		modelType,
	});
}
