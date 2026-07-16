import {Button, Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useEffect, useState} from 'react';

import BasicErrorAlert from '../../BasicErrorAlert';
import DocumentTitle from '../../DocumentTitle';
import {getSoundDataByName} from '../../messages/getSoundDataByName';

function getMimeType(buf: Uint8Array) {
	if (buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70) {
		return 'audio/wav';
	}

	if (buf[0] === 79 && buf[1] === 103 && buf[2] === 103 && buf[3] === 83) {
		return 'audio/ogg';
	}

	return null;
}

const soundQueryOptions = (name: string) =>
	queryOptions({
		queryKey: ['sounds', name],
		queryFn() {
			return getSoundDataByName(name);
		},
	});

function RouteComponent() {
	const {name} = useParams({
		from: '/_app/sounds/$name',
	});

	const {data} = useSuspenseQuery(soundQueryOptions(name));
	const {soundData} = data;

	const [blobUrl, setBlobUrl] = useState<string | null>(null);

	useEffect(() => {
		const mimeType = getMimeType(soundData);

		const blob = new Blob([soundData], {type: mimeType ?? undefined});
		const url = window.URL.createObjectURL(blob);
		// eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect
		setBlobUrl(url);

		return () => {
			window.URL.revokeObjectURL(url);
		};
	}, [soundData]);

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={[name, 'Sounds']} />

			<Title order={2}>{name}</Title>

			{blobUrl ? (
				<div>
					<Button component="a" href={blobUrl} download={name}>
						Download raw sound
					</Button>
				</div>
			) : null}

			{blobUrl ? (
				<audio src={blobUrl} controls style={{width: '100%'}} />
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/sounds/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(soundQueryOptions(params.name)),
	errorComponent: ({error}) => {
		if (error.message === 'NoMatch') {
			return (
				<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
					<BasicErrorAlert title="This sound does not exist." />
				</Stack>
			);
		}

		throw error;
	},
});
