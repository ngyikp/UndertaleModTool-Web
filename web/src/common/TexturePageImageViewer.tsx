import {useSuspenseQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

import {embeddedTexturesByIdQueryOptions} from '../messages/getEmbeddedTextureInfoById';
import {texturePageByIdQueryOptions} from '../messages/getTexturePageInfoById';

import drawTexturePageImage from './image/drawTexturePageImage';
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
			fileName={'Texture ' + texturePageId.toString()}
			width={texturePageData.TargetWidth}
			height={texturePageData.TargetHeight}
			enableDownload={embeddedTextureData.DownloadableFileContents != null}
		/>
	);
}
