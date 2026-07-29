import {Title} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Link, useParams} from '@tanstack/react-router';

import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import DocumentTitle from '../../common/DocumentTitle';
import TexturePageImageViewer from '../../common/TexturePageImageViewer';
import {embeddedTexturesInfoByIdQueryOptions} from '../../messages/getEmbeddedTextureInfoById';
import {texturePageByIdQueryOptions} from '../../messages/getTexturePageInfoById';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function RouteComponent() {
	const id = useParams({
		from: '/_app/texture-pages/$id',
		select: (params) => params.id,
	});

	const {data: texturePageData} = useSuspenseQuery(
		texturePageByIdQueryOptions(id),
	);

	return (
		<ContentViewWithPadding>
			<DocumentTitle text={['Texture ' + id.toString(), 'Texture pages']} />

			<Title order={2}>Texture {id}</Title>

			<p>
				Source position: {texturePageData.SourceX}x{texturePageData.SourceY}
				<br />
				Source size: {texturePageData.SourceWidth}x
				{texturePageData.SourceHeight}
			</p>

			<p>
				Target position: {texturePageData.TargetX}x{texturePageData.TargetY}
				<br />
				Target size: {texturePageData.TargetWidth}x
				{texturePageData.TargetHeight}
			</p>

			<p>
				Bounding size: {texturePageData.BoundingWidth}x
				{texturePageData.BoundingHeight}
			</p>

			<p>
				<Link
					to="/embedded-textures/$id"
					params={{id: texturePageData.EmbeddedTextureID}}
				>
					Go to embedded texture {texturePageData.EmbeddedTextureID}
				</Link>
			</p>

			<TexturePageImageViewer texturePageId={id} enableImageActions={true} />
		</ContentViewWithPadding>
	);
}

export const Route = createFileRoute('/_app/texture-pages/$id')({
	component: RouteComponent,
	params: {
		parse(params) {
			return {
				id: parseInt(params.id, 10),
			};
		},
	},
	loader: async ({context, params}) => {
		const texturePageData = await context.queryClient.ensureQueryData(
			texturePageByIdQueryOptions(params.id),
		);

		await context.queryClient.ensureQueryData(
			embeddedTexturesInfoByIdQueryOptions(texturePageData.EmbeddedTextureID),
		);

		return texturePageData;
	},
	errorComponent({error}) {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message.startsWith('ArgumentOutOfRange')) {
				return <ContentViewAlert title="This texture page does not exist." />;
			}
		}

		return <ContentViewAlert error={error} />;
	},
});
