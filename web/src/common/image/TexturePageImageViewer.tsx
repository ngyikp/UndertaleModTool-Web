import {useSuspenseQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

import {embeddedTexturesInfoByIdQueryOptions} from '../../messages/getEmbeddedTextureInfoById';
import {texturePageByIdQueryOptions} from '../../messages/getTexturePageInfoById';

import drawTexturePageImage from './drawTexturePageImage';
import ImageViewer from './ImageViewer';

type Props = Readonly<{
	texturePageId: number;
	fileName: string;
	enableImageActions: boolean;
}>;

export default function TexturePageImageViewer({
	texturePageId,
	fileName,
	enableImageActions,
}: Props) {
	const {data: texturePageData} = useSuspenseQuery(
		texturePageByIdQueryOptions(texturePageId),
	);
	const {data: embeddedTextureData} = useSuspenseQuery(
		embeddedTexturesInfoByIdQueryOptions(texturePageData.EmbeddedTextureID),
	);

	const [blob, setBlob] = useState<Blob | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		drawTexturePageImage(texturePageData, embeddedTextureData)
			.then(setBlob)
			.catch(setError);

		return () => {
			setBlob(null);
			setError(null);
		};
	}, [embeddedTextureData, texturePageData]);

	if (error) {
		throw error;
	}

	return (
		<ImageViewer
			blob={blob}
			fileName={fileName}
			width={texturePageData.TargetWidth}
			height={texturePageData.TargetHeight}
			withActions={enableImageActions}
			downloadButtonText={
				embeddedTextureData.Format === 'Png' ? 'Export image' : 'Export as PNG'
			}
		/>
	);
}
