import {queryOptions} from '@tanstack/react-query';
import {z} from 'zod/mini';

import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetSpriteInfoByNameRequest = {
	type: 'getSpriteInfoByName';
	name: string;
};

export type GetSpriteInfoByNameResult = SpriteInfoType;

// Info about UndertaleSprite. Keep this in sync with `src/Serializers/SpriteInfo.cs`
export const SpriteInfoSchema = z.object({
	TexturePageIDs: z.array(z.int()),
});

type SpriteInfoType = z.infer<typeof SpriteInfoSchema>;

function getSpriteInfoByName(name: string) {
	return sendMessageToWorkerAsPromise<GetSpriteInfoByNameResult>({
		type: 'getSpriteInfoByName',
		name,
	});
}

export const spriteInfoByNameQueryOptions = (name: string) =>
	queryOptions({
		queryKey: ['sprites', name],
		queryFn() {
			return getSpriteInfoByName(name);
		},
	});
