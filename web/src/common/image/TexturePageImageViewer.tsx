import {useQuery, useSuspenseQuery} from '@tanstack/react-query';

import {embeddedTexturesInfoByIdQueryOptions} from '../../messages/getEmbeddedTextureInfoById';
import {texturePageByIdQueryOptions} from '../../messages/getTexturePageInfoById';

import drawTexturePageImageQueryOptions from './drawTexturePageImageQueryOptions';
import ImageViewer from './ImageViewer';

type Props = Readonly<{
	texturePageId: number;
	includePadding: boolean;
	fileName: string;
	enableImageActions: boolean;
}>;

export default function TexturePageImageViewer({
	texturePageId,
	includePadding,
	fileName,
	enableImageActions,
}: Props) {
	const {data: texturePageData} = useSuspenseQuery(
		texturePageByIdQueryOptions(texturePageId),
	);
	const {data: embeddedTextureData} = useSuspenseQuery(
		embeddedTexturesInfoByIdQueryOptions(texturePageData.EmbeddedTextureID),
	);

	const {data: blob, error} = useQuery(
		drawTexturePageImageQueryOptions(texturePageId, includePadding),
	);

	if (error) {
		throw error;
	}

	return (
		<ImageViewer
			blob={blob ?? null}
			fileName={fileName}
			width={
				includePadding
					? texturePageData.BoundingWidth
					: texturePageData.TargetWidth
			}
			height={
				includePadding
					? texturePageData.BoundingHeight
					: texturePageData.TargetHeight
			}
			withActions={enableImageActions}
			downloadButtonText={
				embeddedTextureData.Format === 'Png' ? 'Export image' : 'Export as PNG'
			}
		/>
	);
}
