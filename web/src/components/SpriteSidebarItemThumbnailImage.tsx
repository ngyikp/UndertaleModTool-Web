import {Loader} from '@mantine/core';
import {useIntersection} from '@mantine/hooks';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

import drawTexturePageImage from '../common/image/drawTexturePageImage';
import useBlobAsUrl from '../common/image/useBlobAsUrl';
import {embeddedTexturesInfoByIdQueryOptions} from '../messages/getEmbeddedTextureInfoById';
import {spriteInfoByNameQueryOptions} from '../messages/getSpriteInfoByName';
import {texturePageByIdQueryOptions} from '../messages/getTexturePageInfoById';

type Props = Readonly<{
	imageClassName?: string;
	spriteName: string;
	wrapClassName?: string;
}>;

export default function SpriteSidebarItemThumbnailImage({
	imageClassName,
	spriteName,
	wrapClassName,
}: Props) {
	const {ref, entry} = useIntersection();
	const isIntersecting = entry?.isIntersecting ?? false;

	const {
		data: spriteInfo,
		isLoading,
		isError,
	} = useQuery({
		...spriteInfoByNameQueryOptions(spriteName),
		enabled: isIntersecting,
	});
	const pageId = spriteInfo?.TexturePageIDs[0];

	const {
		data: texturePageData,
		isLoading: isLoading2,
		isError: isError2,
	} = useQuery({
		...texturePageByIdQueryOptions(pageId ?? 0),
		enabled: pageId != null && isIntersecting,
	});

	const {
		data: embeddedTextureData,
		isLoading: isLoading3,
		isError: isError3,
	} = useQuery({
		...embeddedTexturesInfoByIdQueryOptions(
			texturePageData?.EmbeddedTextureID ?? 0,
		),
		enabled: texturePageData != null && isIntersecting,
	});

	const [blob, setBlob] = useState<Blob | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (
			pageId != null &&
			texturePageData != null &&
			embeddedTextureData != null
		) {
			drawTexturePageImage(texturePageData, embeddedTextureData, false)
				.then(setBlob)
				.catch(setError);
		}

		return () => {
			setBlob(null);
			setError(null);
		};
	}, [pageId, embeddedTextureData, texturePageData]);

	const blobUrl = useBlobAsUrl(blob);

	if (error || isError || isError2 || isError3) {
		return <div className={wrapClassName} />;
	}

	return (
		<div className={wrapClassName} ref={ref}>
			{isLoading || isLoading2 || isLoading3 || !blobUrl ? (
				isIntersecting ? (
					<Loader color="blue" size="xs" />
				) : null
			) : (
				<img src={blobUrl} alt="" className={imageClassName} />
			)}
		</div>
	);
}
