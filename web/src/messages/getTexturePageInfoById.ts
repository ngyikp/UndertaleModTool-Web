import {queryOptions} from '@tanstack/react-query';
import {z} from 'zod/mini';

import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetTexturePageInfoByIdRequest = {
	type: 'getTexturePageInfoById';
	id: number;
};

export type GetTexturePageInfoByIdResult = TexturePageInfoType;

// Info about UndertaleTexturePageItem. Keep this in sync with `src/Serializers/TexturePageInfo.cs`
export const TexturePageInfoSchema = z.object({
	EmbeddedTextureID: z.int(),

	SourceX: z.int(),
	SourceY: z.int(),
	SourceWidth: z.int(),
	SourceHeight: z.int(),

	TargetX: z.int(),
	TargetY: z.int(),
	TargetWidth: z.int(),
	TargetHeight: z.int(),

	BoundingWidth: z.int(),
	BoundingHeight: z.int(),
});

export type TexturePageInfoType = z.infer<typeof TexturePageInfoSchema>;

function getTexturePageInfoById(id: number) {
	return sendMessageToWorkerAsPromise<GetTexturePageInfoByIdResult>({
		type: 'getTexturePageInfoById',
		id,
	});
}

export const texturePageByIdQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ['texture-pages', id],
		queryFn() {
			return getTexturePageInfoById(id);
		},
	});
