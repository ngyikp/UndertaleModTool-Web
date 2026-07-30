import {z} from 'zod/mini';

import {sendMessageToWorker} from '../worker/worker-handler';
import type {SpecificWorkerResponses} from '../worker/WorkerMessageTypes';

export type ReadFileRequest = {
	type: 'readFile';
	bytes: Uint8Array<ArrayBuffer>;
};

export type ReadFileResult = DataFileLoadInfoType;

// Information about the loaded data file, such as any warnings.
// Keep this in sync with `src/Serializers/DataFileLoadInfo.cs`
export const DataFileLoadInfoSchema = z.object({
	Successful: z.boolean(),
	HadImportantWarnings: z.boolean(),
	Warnings: z.array(z.string()),
	UMTLibVersion: z.string(),
});

export type DataFileLoadInfoType = z.infer<typeof DataFileLoadInfoSchema>;

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
