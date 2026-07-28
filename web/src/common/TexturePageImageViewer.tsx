import {useSuspenseQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

import {embeddedTexturesByIdQueryOptions} from '../messages/getEmbeddedTextureInfoById';
import {texturePageByIdQueryOptions} from '../messages/getTexturePageInfoById';

import drawImageToBlob from './drawImageToBlob';
import ImageViewer from './ImageViewer';

type Props = Readonly<{
	texturePageId: number;
}>;

export default function TexturePageImageViewer({texturePageId}: Props) {
	const {data: texturePageData} = useSuspenseQuery(
		texturePageByIdQueryOptions(texturePageId),
	);
	const {data: embeddedTextureData} = useSuspenseQuery(
		embeddedTexturesByIdQueryOptions(texturePageData.EmbeddedTextureID),
	);

	const [error, setError] = useState<Error | null>(null);
	const [finalBlob, setFinalBlob] = useState<Blob | null>(null);

	useEffect(() => {
		// todo add includePadding parameter
		async function draw() {
			setError(null);

			// DDS is not supported yet
			if (embeddedTextureData.Format === 'Dds') {
				return;
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

			canvas.toBlob((croppedImageBlob) => {
				if (croppedImageBlob == null) {
					setError(new Error('Failed to render canvas image'));
					return;
				}

				setFinalBlob(croppedImageBlob);
			});
		}

		draw().catch(setError);

		return () => {
			setError(null);
			setFinalBlob(null);
		};
	}, [
		embeddedTextureData.DownloadableFileContents,
		embeddedTextureData.Bgra,
		embeddedTextureData.Format,
		embeddedTextureData.Width,
		embeddedTextureData.Height,
		texturePageData.SourceHeight,
		texturePageData.SourceWidth,
		texturePageData.SourceX,
		texturePageData.SourceY,
		texturePageData.TargetHeight,
		texturePageData.TargetWidth,
	]);

	if (error) {
		throw error;
	}

	return (
		<ImageViewer
			blob={finalBlob}
			fileName={'Texture ' + texturePageId.toString()}
			width={texturePageData.TargetWidth}
			height={texturePageData.TargetHeight}
			enableDownload={embeddedTextureData.DownloadableFileContents != null}
		/>
	);
}
