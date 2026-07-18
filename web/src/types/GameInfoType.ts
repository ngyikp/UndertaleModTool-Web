import {z} from 'zod/mini';

export const GameInfoSchema = z.object({
	ProjectName: z.nullable(z.string()),
	DisplayName: z.nullable(z.string()),
	IsGameMaker2: z.boolean(),
	IsYYC: z.boolean(),
	IsDebuggerDisabled: z.boolean(),

	BytecodeVersion: z.int(),
	ConfigurationName: z.nullable(z.string()),
	ItemCounts: z.object({
		Sounds: z.int(),
		Sprites: z.int(),
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

		Code: z.int(),
		Variables: z.int(),
		Functions: z.int(),
		CodeLocals: z.int(),

		Strings: z.int(),
		EmbeddedTextures: z.int(),
		EmbeddedAudio: z.int(),
	}),
});

export type GameInfoType = z.infer<typeof GameInfoSchema>;
