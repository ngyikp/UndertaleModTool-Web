import {queryOptions} from '@tanstack/react-query';
import {z} from 'zod/mini';

import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetDataFileLoadInfoRequest = {
	type: 'getDataFileLoadInfo';
};

export type GetDataFileLoadInfoResult = DataFileLoadInfoType;

// Information about the loaded data file, such as any warnings.
// Keep this in sync with `src/Serializers/DataFileLoadInfo.cs`
export const DataFileLoadInfoSchema = z.object({
	Successful: z.boolean(),
	HadImportantWarnings: z.boolean(),
	Warnings: z.array(z.string()),
	UMTLibVersion: z.string(),
});

export type DataFileLoadInfoType = z.infer<typeof DataFileLoadInfoSchema>;

function getDataFileLoadInfo() {
	return sendMessageToWorkerAsPromise<GetDataFileLoadInfoResult>({
		type: 'getDataFileLoadInfo',
	});
}

export const getDataFileLoadInfoQueryOptions = () =>
	queryOptions({
		queryKey: ['data-load-info'],
		async queryFn() {
			try {
				return await getDataFileLoadInfo();
			} catch {
				return null;
			}
		},
	});
