import {Button, Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useEffect, useMemo, useState} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import {getEmbeddedTextureImageById} from '../../messages/getEmbeddedTextureImageById';

function getMimeType(buf: Uint8Array) {
	if (buf[0] === 137 && buf[1] === 80 && buf[2] === 78 && buf[3] === 71) {
		return 'image/png';
	}

	return null;
}

const embeddedTexturesQueryOptions = (id: number) =>
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
		embeddedTexturesQueryOptions(parseInt(id, 10)),
	);
	const {imageData} = data;

	const [blobUrl, setBlobUrl] = useState<string | null>(null);

	const mimeType = useMemo(() => {
		return getMimeType(imageData);
	}, [imageData]);

	useEffect(() => {
		const blob = new Blob([imageData], {type: mimeType ?? undefined});
		const url = window.URL.createObjectURL(blob);
		// eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect
		setBlobUrl(url);

		return () => {
			window.URL.revokeObjectURL(url);
		};
	}, [imageData, mimeType]);

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={['Texture ' + id, 'Embedded textures']} />

			<Title order={2}>Texture {id}</Title>

			{blobUrl ? (
				<div>
					<Button component="a" href={blobUrl} download={'Texture ' + id}>
						Export raw image
					</Button>
				</div>
			) : null}

			{blobUrl && mimeType === 'image/png' ? (
				<div style={{overflowX: 'auto'}}>
					<img
						src={blobUrl}
						alt={'Texture ' + id}
						className="checkerboard"
						style={{display: 'block'}}
					/>
				</div>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/embedded-textures/$id')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(
			embeddedTexturesQueryOptions(parseInt(params.id, 10)),
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
