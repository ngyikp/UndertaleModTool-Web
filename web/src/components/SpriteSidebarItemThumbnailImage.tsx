import {Loader} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';

import drawTexturePageImage from '../common/image/drawTexturePageImage';
import useBlobAsUrl from '../common/image/useBlobAsUrl';
import {embeddedTexturesInfoByIdQueryOptions} from '../messages/getEmbeddedTextureInfoById';
import {spriteInfoByNameQueryOptions} from '../messages/getSpriteInfoByName';
import {texturePageByIdQueryOptions} from '../messages/getTexturePageInfoById';

// todo consider generalize this
// todo look into https://github.com/TanStack/query/discussions/872#discussioncomment-14084248
const drawTexturePageImageQueryOptions = (spriteName: string) =>
	queryOptions({
		queryKey: ['sprites', spriteName, 'blob'],
		async queryFn({client}) {
			const spriteInfo = await client.query(
				spriteInfoByNameQueryOptions(spriteName),
			);

			const pageId = spriteInfo.TexturePageIDs[0];
			if (pageId == null || pageId === -1) {
				throw new Error('Empty sprite');
			}

			const texturePageData = await client.query(
				texturePageByIdQueryOptions(pageId),
			);

			const embeddedTextureData = await client.query(
				embeddedTexturesInfoByIdQueryOptions(texturePageData.EmbeddedTextureID),
			);

			return drawTexturePageImage(texturePageData, embeddedTextureData, false);
		},
	});

type Props = Readonly<{
	imageClassName?: string;
	spriteName: string;
}>;

export default function SpriteSidebarItemThumbnailImage({
	imageClassName,
	spriteName,
}: Props) {
	const {data: blob} = useSuspenseQuery(
		drawTexturePageImageQueryOptions(spriteName),
	);

	const blobUrl = useBlobAsUrl(blob);
	if (!blobUrl) {
		return <Loader color="blue" size="xs" />;
	}

	return <img src={blobUrl} alt="" className={imageClassName} />;
}
