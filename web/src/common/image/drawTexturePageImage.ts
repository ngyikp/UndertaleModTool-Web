import type {EmbeddedTextureInfoType} from '../../messages/getEmbeddedTextureInfoById';
import type {TexturePageInfoType} from '../../messages/getTexturePageInfoById';

import drawImageToBlob from './drawImageToBlob';
import EmbeddedTextureBlobCache from './EmbeddedTextureBlobCache';

export default async function drawTexturePageImage(
	texturePageData: TexturePageInfoType,
	embeddedTextureData: EmbeddedTextureInfoType,
	includePadding: boolean,
): Promise<Blob> {
	if (embeddedTextureData.Format === 'Dds') {
		throw new Error('DDS format is not supported yet');
	}

	// First, convert unusable file format to canvas
	const embeddedTextureCanvas =
		await EmbeddedTextureBlobCache.getOrInsertComputed(
			texturePageData.EmbeddedTextureID,
			() => {
				return drawImageToBlob(
					embeddedTextureData.DownloadableFileContents,
					embeddedTextureData.Bgra,
					embeddedTextureData.Width,
					embeddedTextureData.Height,
				);
			},
		);

	// Based on https://github.com/UnderminersTeam/UndertaleModTool/blob/2b6fe69722cec25219f1ae21f8111907c2a15629/UndertaleModLib/Util/TextureWorker.cs#L63
	// Ensure texture is no larger than its bounding box
	const exportWidth = texturePageData.BoundingWidth; // sprite.Width
	const exportHeight = texturePageData.BoundingHeight; // sprite.Height
	if (
		includePadding &&
		(texturePageData.TargetWidth > exportWidth ||
			texturePageData.TargetHeight > exportHeight)
	) {
		throw new Error('Texture is larger than its bounding box');
	}

	const canvas = new OffscreenCanvas(
		includePadding ? exportWidth : texturePageData.SourceWidth,
		includePadding ? exportHeight : texturePageData.SourceHeight,
	);

	const ctx = canvas.getContext('2d', {alpha: true});
	if (!ctx) {
		throw new Error('Canvas rendering context is missing');
	}

	// Create an image cropped from the item's part of the texture page
	const imageBitmap = await createImageBitmap(
		embeddedTextureCanvas,
		texturePageData.SourceX,
		texturePageData.SourceY,
		texturePageData.SourceWidth,
		texturePageData.SourceHeight,
	);

	// Resize the image, if necessary
	let resizeWidth = imageBitmap.width;
	let resizeHeight = imageBitmap.height;
	if (
		texturePageData.SourceWidth !== texturePageData.TargetWidth ||
		texturePageData.SourceHeight !== texturePageData.TargetHeight
	) {
		if (
			canvas.width !== texturePageData.TargetWidth ||
			canvas.height !== texturePageData.TargetHeight
		) {
			resizeWidth = texturePageData.TargetWidth;
			resizeHeight = texturePageData.TargetHeight;
		}
	}

	ctx.drawImage(
		imageBitmap,
		includePadding ? texturePageData.TargetX : 0,
		includePadding ? texturePageData.TargetY : 0,
		resizeWidth,
		resizeHeight,
	);

	return canvas.convertToBlob();
}
