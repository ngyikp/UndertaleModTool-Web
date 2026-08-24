import {queryOptions} from '@tanstack/react-query';
import {z} from 'zod/mini';

import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetGameObjectInfoByNameRequest = {
	type: 'getGameObjectInfoByName';
	name: string;
};

export type GetGameObjectInfoByNameResult = GameObjectInfoType;

// Info about UndertaleGameObject. Keep this in sync with `src/Serializers/GameObjectInfo.cs`
export const GameObjectInfoSchema = z.object({
	SpriteName: z.nullable(z.string()),
	Visible: z.boolean(),
	Persistent: z.boolean(),
	ParentGameObjectName: z.nullable(z.string()),
	Events: z.record(
		z.int(), // EventType enum
		z.array(
			z.object({
				ActionsCodeNames: z.array(z.nullable(z.string())),
				EventSubtype: z.int(), // EventSubtype enum
			}),
		),
	),
});

type GameObjectInfoType = z.infer<typeof GameObjectInfoSchema>;

function getGameObjectInfoByName(name: string) {
	return sendMessageToWorkerAsPromise<GetGameObjectInfoByNameResult>({
		type: 'getGameObjectInfoByName',
		name,
	});
}

export const gameObjectInfoByNameQueryOptions = (name: string) =>
	queryOptions({
		queryKey: ['objects', name],
		queryFn() {
			return getGameObjectInfoByName(name);
		},
	});
