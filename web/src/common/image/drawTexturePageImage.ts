import type {EmbeddedTextureInfoType} from '../../messages/getEmbeddedTextureInfoById';
import type {TexturePageInfoType} from '../../messages/getTexturePageInfoById';

import drawImageToBlob from './drawImageToBlob';

// todo add includePadding parameter
export default async function drawTexturePageImage(
	texturePageData: TexturePageInfoType,
	embeddedTextureData: EmbeddedTextureInfoType,
): Promise<Blob> {
	if (embeddedTextureData.Format === 'Dds') {
		throw new Error('DDS format is not supported yet');
	}

	// First, convert unusable file format to canvas
	// todo this should probably be cached
	const embeddedTextureCanvas = await drawImageToBlob(
		embeddedTextureData.DownloadableFileContents,
		embeddedTextureData.Bgra,
		embeddedTextureData.Width,
		embeddedTextureData.Height,
	);

	// Cropped image canvas
	const canvas = document.createElement('canvas');
	canvas.width = texturePageData.SourceWidth;
	canvas.height = texturePageData.SourceHeight;

	const ctx = canvas.getContext('2d', {alpha: true});
	if (!ctx) {
		throw new Error('Canvas rendering context is missing');
	}

	// Based on https://github.com/UnderminersTeam/UndertaleModTool/blob/2b6fe69722cec25219f1ae21f8111907c2a15629/UndertaleModLib/Util/TextureWorker.cs#L63
	// Create an image cropped from the item's part of the texture page
	const imageBitmap = await createImageBitmap(
		embeddedTextureCanvas,
		texturePageData.SourceX,
		texturePageData.SourceY,
		texturePageData.SourceWidth,
		texturePageData.SourceHeight,
	);

	ctx.drawImage(imageBitmap, 0, 0);

	// Resize the image, if necessary
	if (
		texturePageData.SourceWidth !== texturePageData.TargetWidth ||
		texturePageData.SourceHeight !== texturePageData.TargetHeight
	) {
		const resizeWidth = texturePageData.TargetWidth;
		const resizeHeight = texturePageData.TargetHeight;
		if (canvas.width !== resizeWidth || canvas.height !== resizeHeight) {
			ctx.drawImage(imageBitmap, 0, 0, resizeWidth, resizeHeight);
		}
	}

	return new Promise((resolve, reject) => {
		canvas.toBlob((croppedImageBlob) => {
			if (croppedImageBlob == null) {
				reject(new Error('Failed to render canvas image'));
				return;
			}

			resolve(croppedImageBlob);
		});
	});
}
