import {queryOptions} from '@tanstack/react-query';
import {z} from 'zod/mini';

import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetEmbeddedAudioInfoByIdRequest = {
	type: 'getEmbeddedAudioInfoById';
	id: number;
};

export type GetEmbeddedAudioInfoByIdResult = EmbeddedAudioInfoType;

// Info about UndertaleEmbeddedAudio. Keep this in sync with `src/Serializers/EmbeddedAudioInfo.cs`
export const EmbeddedAudioInfoSchema = z.object({
	FileContents: z.codec(z.base64(), z.instanceof(Uint8Array), {
		decode: (base64String) => z.util.base64ToUint8Array(base64String),
		encode: (bytes) => z.util.uint8ArrayToBase64(bytes),
	}),
});

type EmbeddedAudioInfoType = z.infer<typeof EmbeddedAudioInfoSchema>;

function getEmbeddedAudioInfoById(id: number) {
	return sendMessageToWorkerAsPromise<GetEmbeddedAudioInfoByIdResult>({
		type: 'getEmbeddedAudioInfoById',
		id,
	});
}

export const embeddedAudioByIdQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ['embedded-audio', id],
		queryFn() {
			return getEmbeddedAudioInfoById(id);
		},
	});
