import {Title} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useEffect, useState} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import BasicLoadingMessage from '../../common/BasicLoadingMessage';
import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewLoading from '../../common/ContentViewLoading';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import DocumentTitle from '../../common/DocumentTitle';
import drawImageToBlob from '../../common/image/drawImageToBlob';
import ImageViewer from '../../common/image/ImageViewer';
import {embeddedTexturesInfoByIdQueryOptions} from '../../messages/getEmbeddedTextureInfoById';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function RouteComponent() {
	const id = useParams({
		from: '/_app/embedded-textures/$id',
		select: (params) => params.id,
	});

	const {data} = useSuspenseQuery(embeddedTexturesInfoByIdQueryOptions(id));

	const [error, setError] = useState<Error | null>(null);
	const [finalBlob, setFinalBlob] = useState<Blob | null>(null);

	const {
		DownloadableFileContents: fileContents,
		Bgra: bgra,
		Format: format,
		Width: width,
		Height: height,
	} = data;
	const title = 'Texture ' + id.toString();

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
		<ContentViewWithPadding>
			<DocumentTitle text={[title, 'Embedded textures']} />

			<Title order={2}>{title}</Title>

			{error != null ? <BasicErrorAlert error={error} /> : null}

			<p>Original format: {format}</p>

			<p>
				Size: {width}x{height}
			</p>

			{finalBlob != null ? (
				<ImageViewer
					blob={finalBlob}
					fileName={title}
					width={width}
					height={height}
					withActions={true}
					downloadButtonText={
						format === 'Png' ? 'Export image' : 'Export as PNG'
					}
				/>
			) : error == null ? (
				<BasicLoadingMessage />
			) : null}
		</ContentViewWithPadding>
	);
}

export const Route = createFileRoute('/_app/embedded-textures/$id')({
	component: RouteComponent,
	params: {
		parse(params) {
			return {
				id: parseInt(params.id, 10),
			};
		},
	},
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(
			embeddedTexturesInfoByIdQueryOptions(params.id),
		),
	errorComponent({error}) {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message.startsWith('ArgumentOutOfRange')) {
				return (
					<ContentViewAlert title="This embedded texture does not exist." />
				);
			}
		}

		return <ContentViewAlert error={error} />;
	},
	pendingComponent: () => (
		<ContentViewLoading text="Loading embedded texture..." />
	),
});
