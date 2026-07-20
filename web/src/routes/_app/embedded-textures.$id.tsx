import {Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import ImageViewer from '../../common/ImageViewer';
import {getEmbeddedTextureImageById} from '../../messages/getEmbeddedTextureInfoById';

// todo fix this lint
// eslint-disable-next-line react-refresh/only-export-components
export const embeddedTexturesByIdQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ['embedded-textures', id],
		queryFn() {
			return getEmbeddedTextureImageById(id);
		},
	});

function RouteComponent() {
	const {id} = useParams({
		from: '/_app/embedded-textures/$id',
	});

	const {data} = useSuspenseQuery(
		embeddedTexturesByIdQueryOptions(parseInt(id, 10)),
	);

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={['Texture ' + id, 'Embedded textures']} />

			<Title order={2}>Texture {id}</Title>

			<p>Format: {data.Format}</p>

			<ImageViewer
				fileContents={data.FileContents}
				fileName={'Texture ' + id}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/embedded-textures/$id')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(
			embeddedTexturesByIdQueryOptions(parseInt(params.id, 10)),
		),
	errorComponent: ({error}) => {
		if (error.message === 'NoMatch') {
			return (
				<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
					<BasicErrorAlert title="This embedded texture does not exist." />
				</Stack>
			);
		}

		throw error;
	},
});
