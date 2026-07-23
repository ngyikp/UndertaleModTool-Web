import {Stack, Title} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useEffect, useState} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import drawImageToBlob from '../../common/drawImageToBlob';
import ImageViewer from '../../common/ImageViewer';
import {embeddedTexturesByIdQueryOptions} from '../../messages/getEmbeddedTextureInfoById';

function RouteComponent() {
	const {id} = useParams({
		from: '/_app/embedded-textures/$id',
	});

	const {data} = useSuspenseQuery(embeddedTexturesByIdQueryOptions(id));

	const [error, setError] = useState<Error | null>(null);
	const [finalBlob, setFinalBlob] = useState<Blob | null>(null);

	const {
		DownloadableFileContents: fileContents,
		Bgra: bgra,
		Format: format,
		Width: width,
		Height: height,
	} = data;

	useEffect(() => {
		async function draw() {
			setError(null);
			setFinalBlob(await drawImageToBlob(fileContents, bgra, width, height));
		}

		draw().catch(setError);

		return () => {
			setError(null);
			setFinalBlob(null);
		};
	}, [bgra, fileContents, height, width]);

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={['Texture ' + id.toString(), 'Embedded textures']} />

			<Title order={2}>Texture {id}</Title>

			{error != null ? <BasicErrorAlert error={error} /> : null}

			<p>Original format: {format}</p>

			{finalBlob != null ? (
				<ImageViewer
					blob={finalBlob}
					fileName={'Texture ' + id.toString()}
					width={width}
					height={height}
					enableDownload={fileContents != null}
				/>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/embedded-textures/$id')({
	component: RouteComponent,
	params: {
		parse: (params) => {
			return {
				id: parseInt(params.id, 10),
			};
		},
	},
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(
			embeddedTexturesByIdQueryOptions(params.id),
		),
	errorComponent: ({error}) => {
		if (error.message.startsWith('ArgumentOutOfRange')) {
			return (
				<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
					<BasicErrorAlert title="This embedded texture does not exist." />
				</Stack>
			);
		}

		throw error;
	},
});
