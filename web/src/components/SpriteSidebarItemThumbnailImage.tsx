import {Loader} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';

import drawTexturePageImageQueryOptions from '../common/image/drawTexturePageImageQueryOptions';
import useBlobAsUrl from '../common/image/useBlobAsUrl';
import {spriteInfoByNameQueryOptions} from '../messages/getSpriteInfoByName';

type Props = Readonly<{
	imageClassName?: string;
	spriteName: string;
}>;

export default function SpriteSidebarItemThumbnailImage({
	imageClassName,
	spriteName,
}: Props) {
	const {data: spriteInfo} = useSuspenseQuery(
		spriteInfoByNameQueryOptions(spriteName),
	);

	const pageId = spriteInfo.TexturePageIDs[0];
	if (pageId == null || pageId === -1) {
		throw new Error('Empty sprite');
	}

	const {data: blob} = useSuspenseQuery(
		drawTexturePageImageQueryOptions(pageId, false),
	);

	const blobUrl = useBlobAsUrl(blob);
	if (!blobUrl) {
		return <Loader color="blue" size="xs" />;
	}

	return <img src={blobUrl} alt="" className={imageClassName} />;
}
