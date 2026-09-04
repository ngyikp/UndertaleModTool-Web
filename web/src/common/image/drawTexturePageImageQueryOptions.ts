import {queryOptions} from '@tanstack/react-query';

import {embeddedTexturesInfoByIdQueryOptions} from '../../messages/getEmbeddedTextureInfoById';
import {texturePageByIdQueryOptions} from '../../messages/getTexturePageInfoById';

import drawTexturePageImage from './drawTexturePageImage';

// todo look into https://github.com/TanStack/query/discussions/872#discussioncomment-14084248
export default (id: number, includePadding: boolean) =>
	queryOptions({
		queryKey: ['texture-pages', id, 'blob', includePadding],
		async queryFn({client}) {
			const texturePageData = await client.query(
				texturePageByIdQueryOptions(id),
			);

			const embeddedTextureData = await client.query(
				embeddedTexturesInfoByIdQueryOptions(texturePageData.EmbeddedTextureID),
			);

			return await drawTexturePageImage(
				texturePageData,
				embeddedTextureData,
				includePadding,
			);
		},
	});
