import {Stack, Title} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useMemo} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import detectImageMimeType from '../../common/detectImageMimeType';
import DocumentTitle from '../../common/DocumentTitle';
import ImageViewer from '../../common/ImageViewer';
import {embeddedTexturesByIdQueryOptions} from '../../messages/getEmbeddedTextureInfoById';

function RouteComponent() {
	const {id} = useParams({
		from: '/_app/embedded-textures/$id',
	});

	const {data} = useSuspenseQuery(
		embeddedTexturesByIdQueryOptions(parseInt(id, 10)),
	);
	const {FileContents: fileContents} = data;

	const mimeType = detectImageMimeType(fileContents);
	const blob = useMemo(() => {
		if (fileContents.length <= 0) {
			return;
		}

		return new Blob([fileContents], {
			type: mimeType ?? 'application/octet-stream',
		});
	}, [fileContents, mimeType]);

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={['Texture ' + id, 'Embedded textures']} />

			<Title order={2}>Texture {id}</Title>

			<p>Format: {data.Format}</p>

			{blob ? (
				<ImageViewer
					blob={blob}
					fileName={'Texture ' + id}
					mimeType={mimeType}
				/>
			) : null}
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
