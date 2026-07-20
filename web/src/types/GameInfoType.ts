import {z} from 'zod/mini';

// General info of the game. Keep this in sync with `src/Serializers/GameInfo.cs`
export const GameInfoSchema = z.object({
	ProjectName: z.nullable(z.string()),
	DisplayName: z.nullable(z.string()),
	IsGameMaker2: z.boolean(),
	IsYYC: z.boolean(),
	IsDebuggerDisabled: z.boolean(),
	Version: z.object({
		Major: z.int(),
		Minor: z.int(),
		Release: z.int(),
		Build: z.int(),
	}),

	BytecodeVersion: z.int(),
	ConfigurationName: z.nullable(z.string()),
	ItemCounts: z.object({
		Sprites: z.int(),
		Sounds: z.int(),
		AudioGroups: z.int(),
		Backgrounds: z.int(),
		Paths: z.int(),
		Scripts: z.int(),
		Shaders: z.int(),
		Fonts: z.int(),
		Timelines: z.int(),
		GameObjects: z.int(),
		Rooms: z.int(),
		Extensions: z.int(),
		TexturePageItems: z.int(),
		TextureGroupInfo: z.int(),

		Code: z.int(),
		Variables: z.int(),
		Functions: z.int(),
		CodeLocals: z.int(),

		Strings: z.int(),
		EmbeddedTextures: z.int(),
		EmbeddedImages: z.int(),
		EmbeddedAudio: z.int(),
		ParticleSystems: z.int(),
	}),
});

export type GameInfoType = z.infer<typeof GameInfoSchema>;
