import {Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import ImageViewer from '../../common/ImageViewer';
import {getTexturePageInfoById} from '../../messages/getTexturePageInfoById';

import {embeddedTexturesByIdQueryOptions} from './embedded-textures.$id';

const texturePageByIdQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ['texture-pages', id],
		queryFn() {
			return getTexturePageInfoById(id);
		},
	});

function RouteComponent() {
	const {id} = useParams({
		from: '/_app/texture-pages/$id',
	});

	const {data: texturePageData} = useSuspenseQuery(
		texturePageByIdQueryOptions(parseInt(id, 10)),
	);
	const {data: embeddedTextureData} = useSuspenseQuery(
		embeddedTexturesByIdQueryOptions(texturePageData.EmbeddedTextureID),
	);

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={['Texture ' + id, 'Texture pages']} />

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

			<ImageViewer
				fileContents={embeddedTextureData.FileContents}
				fileName={'Texture ' + id}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/texture-pages/$id')({
	component: RouteComponent,
	loader: async ({context, params}) => {
		const texturePageData = await context.queryClient.ensureQueryData(
			texturePageByIdQueryOptions(parseInt(params.id, 10)),
		);

		await context.queryClient.ensureQueryData(
			embeddedTexturesByIdQueryOptions(texturePageData.EmbeddedTextureID),
		);

		return texturePageData;
	},
	errorComponent: ({error}) => {
		if (error.message === 'NoMatch') {
			return (
				<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
					<BasicErrorAlert title="This texture page does not exist." />
				</Stack>
			);
		}

		throw error;
	},
});
