import {queryOptions} from '@tanstack/react-query';
import {z} from 'zod/mini';

import {
	EventSubtypeDraw,
	EventSubtypeGesture,
	EventSubtypeKey,
	EventSubtypeMouse,
	EventSubtypeOther,
	EventSubtypeStep,
	EventType,
} from '../types/GameObjectEventType';
import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetGameObjectInfoByNameRequest = {
	type: 'getGameObjectInfoByName';
	name: string;
};

export type GetGameObjectInfoByNameResult = GameObjectInfoType;

const GameObjectEventBaseSchema = z.object({
	ActionsCodeNames: z.array(z.nullable(z.string())),
	EventSubtype: z.literal(0), // Has no subtypes, it's always 0
});

const GameObjectEventIntegerSchema = z.object({
	...GameObjectEventBaseSchema.shape,
	EventSubtype: z.int(), // used by Alarm and Collision
});

const GameObjectEventStepSchema = z.object({
	...GameObjectEventBaseSchema.shape,
	EventSubtype: z.enum(EventSubtypeStep),
});

const GameObjectEventKeySchema = z.object({
	...GameObjectEventBaseSchema.shape,
	// According to EventSubtypeKey, "if doesn't match any of the below, then it's probably just chr(value)"
	EventSubtype: z.union([z.enum(EventSubtypeKey), z.int()]),
});

const GameObjectEventMouseSchema = z.object({
	...GameObjectEventBaseSchema.shape,
	EventSubtype: z.enum(EventSubtypeMouse),
});

const GameObjectEventOtherSchema = z.object({
	...GameObjectEventBaseSchema.shape,
	EventSubtype: z.enum(EventSubtypeOther),
});

const GameObjectEventDrawSchema = z.object({
	...GameObjectEventBaseSchema.shape,
	EventSubtype: z.enum(EventSubtypeDraw),
});

const GameObjectEventGestureSchema = z.object({
	...GameObjectEventBaseSchema.shape,
	EventSubtype: z.enum(EventSubtypeGesture),
});

const GameObjectEventAllSchemas = z.object({
	[EventType.Create]: z.array(GameObjectEventBaseSchema),
	[EventType.Destroy]: z.array(GameObjectEventBaseSchema),
	[EventType.Alarm]: z.array(GameObjectEventIntegerSchema),
	[EventType.Step]: z.array(GameObjectEventStepSchema),
	[EventType.Collision]: z.array(GameObjectEventIntegerSchema),
	[EventType.Keyboard]: z.array(GameObjectEventKeySchema),
	[EventType.Mouse]: z.array(GameObjectEventMouseSchema),
	[EventType.Other]: z.array(GameObjectEventOtherSchema),
	[EventType.Draw]: z.array(GameObjectEventDrawSchema),
	[EventType.KeyPress]: z.array(GameObjectEventKeySchema),
	[EventType.KeyRelease]: z.array(GameObjectEventKeySchema),
	[EventType.Trigger]: z.array(GameObjectEventBaseSchema),

	// these event types don't exist on early engine versions
	[EventType.CleanUp]: z.optional(z.array(GameObjectEventBaseSchema)),
	[EventType.Gesture]: z.optional(z.array(GameObjectEventGestureSchema)),
	[EventType.PreCreate]: z.optional(z.array(GameObjectEventBaseSchema)),
});

// Info about UndertaleGameObject. Keep this in sync with `src/Serializers/GameObjectInfo.cs`
export const GameObjectInfoSchema = z.object({
	Id: z.int(),
	SpriteName: z.nullable(z.string()),
	Visible: z.boolean(),
	Persistent: z.boolean(),
	ParentGameObjectName: z.nullable(z.string()),
	Events: GameObjectEventAllSchemas,
});

export type GameObjectEventAllType = z.infer<typeof GameObjectEventAllSchemas>;
export type GameObjectInfoType = z.infer<typeof GameObjectInfoSchema>;

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
