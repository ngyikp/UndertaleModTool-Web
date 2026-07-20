import {z} from 'zod/mini';

import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetCodeInfoByNameRequest = {
	type: 'getCodeInfoByName';
	name: string;
};

export type GetCodeInfoByNameResult = CodeInfoType;

// Info about UndertaleCode. Keep this in sync with `src/Serializers/GetCodeInfoByName.cs`
export const CodeInfoSchema = z.object({
	DecompiledCode: z.nullable(z.string()),
	ParentEntryName: z.nullable(z.string()),
});

export type CodeInfoType = z.infer<typeof CodeInfoSchema>;

export function getCodeInfoByName(name: string) {
	return sendMessageToWorkerAsPromise<GetCodeInfoByNameResult>({
		type: 'getCodeInfoByName',
		name,
	});
}
