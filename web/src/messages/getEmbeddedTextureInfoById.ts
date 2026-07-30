import {queryOptions} from '@tanstack/react-query';
import {deflate, inflate} from 'pako';
import {z} from 'zod/mini';

import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

// Enum from `UndertaleModLib.Util.GMImage.ImageFormat`
const ImageFormatEnum = [
	/// <summary>
	/// Raw BGRA color format, with 8 bits per channel (32 bits per pixel).
	/// </summary>
	'RawBgra',

	/// <summary>
	/// PNG file format.
	/// </summary>
	'Png',

	/// <summary>
	/// GameMaker's custom variant of the QOI image file format.
	/// </summary>
	'Qoi',

	/// <summary>
	/// BZip2 compression applied on top of GameMaker's custom variant of the QOI image file format.
	/// </summary>
	'Bz2Qoi',

	/// <summary>
	/// DDS file format.
	/// </summary>
	'Dds',

	/// <summary>
	/// Unknown or unsupported file format. Will be represented by raw bytes, including any padding.
	/// </summary>
	/// <remarks>
	/// This format cannot be converted to any other format (nor displayed), but can be saved/loaded.
	/// </remarks>
	'Unknown',
] as const;

export type GetEmbeddedTextureInfoByIdRequest = {
	type: 'getEmbeddedTextureInfoById';
	id: number;
};

export type GetEmbeddedTextureInfoByIdResult = EmbeddedTextureInfoType;

// Info about UndertaleEmbeddedTexture. Keep this in sync with `src/Serializers/EmbeddedTextureInfo.cs`
export const EmbeddedTextureInfoSchema = z.pipe(
	z.object({
		DownloadableFileContents: z.nullable(
			z.codec(z.base64(), z.instanceof(Uint8Array), {
				decode: (base64String) => z.util.base64ToUint8Array(base64String),
				encode: (bytes) => z.util.uint8ArrayToBase64(bytes),
			}),
		),
		BgraCompressed: z.nullable(
			z.codec(z.base64(), z.instanceof(Uint8Array), {
				decode: (base64String) =>
					inflate(z.util.base64ToUint8Array(base64String)),
				encode: (bytes) => z.util.uint8ArrayToBase64(deflate(bytes)),
			}),
		),
		Format: z.enum(ImageFormatEnum),
		Width: z.int(),
		Height: z.int(),
	}),
	// idea from here: https://github.com/colinhacks/zod/issues/486
	z.transform((info) => {
		const {BgraCompressed, ...rest} = info;

		return {
			...rest,
			Bgra: BgraCompressed,
		};
	}),
);

export type EmbeddedTextureInfoType = z.infer<typeof EmbeddedTextureInfoSchema>;

function getEmbeddedTextureInfoById(id: number) {
	return sendMessageToWorkerAsPromise<GetEmbeddedTextureInfoByIdResult>({
		type: 'getEmbeddedTextureInfoById',
		id,
	});
}

export const embeddedTexturesInfoByIdQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ['embedded-textures', id],
		queryFn() {
			return getEmbeddedTextureInfoById(id);
		},
	});
