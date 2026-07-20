import {z} from 'zod/mini';

import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetSoundInfoByNameRequest = {
	type: 'getSoundInfoByName';
	name: string;
};

export type GetSoundInfoByNameResult = SoundInfoType;

// Info about UndertaleSound. Keep this in sync with `src/Serializers/GetSoundInfoByName.cs`
export const SoundInfoSchema = z.object({
	FileContents: z.codec(z.base64(), z.instanceof(Uint8Array), {
		decode: (base64String) => z.util.base64ToUint8Array(base64String),
		encode: (bytes) => z.util.uint8ArrayToBase64(bytes),
	}),
	Flags: z.int(),
	ExternalFileName: z.string(),
	AudioGroupID: z.int(),
	AudioGroupName: z.string(),
});

export type SoundInfoType = z.infer<typeof SoundInfoSchema>;

// Enum from `UndertaleModLib.Models.UndertaleSound.AudioEntryFlags`
export const AudioEntryFlags = {
	/// Whether the sound is embedded into the data file.
	/// </summary>
	/// <remarks>This should ideally be used for sound effects, but not for music.<br/>
	/// The GameMaker documentation also calls this "not streamed" (or "from memory") for when the flag is present,
	/// or "streamed" when it isn't.</remarks>
	IsEmbedded: 0x1,

	/// <summary>
	/// Whether the sound is compressed.
	/// </summary>
	/// <remarks>When a sound is compressed it will take smaller memory/disk space.
	/// However, this is at the cost of needing to decompress it when it needs to be played,
	/// which means slightly higher CPU usage.</remarks>
	// TODO: where exactly is this used? for non-embedded compressed files, this flag doesnt seem to be set.
	IsCompressed: 0x2,

	/// <summary>
	/// Whether the sound is decompressed on game load.
	/// </summary>
	/// <remarks>When a sound is played, it must be loaded into memory first, which would usually be done when the sound is first used.
	/// If you preload it, the sound will be loaded into memory at the start of the game.</remarks>
	// TODO: some predecessor/continuation of Preload? Also why is this flag the combination of both compressed and embedded?
	IsDecompressedOnLoad: 0x3,

	/// <summary>
	/// Whether this sound uses the "new audio system".
	/// </summary>
	/// <remarks>This is default for everything post GameMaker Studio.
	/// The legacy sound system was used in pre Game Maker 8.</remarks>
	Regular: 0x64,
} as const;

export function getSoundInfoByName(name: string) {
	return sendMessageToWorkerAsPromise<GetSoundInfoByNameResult>({
		type: 'getSoundInfoByName',
		name,
	});
}
