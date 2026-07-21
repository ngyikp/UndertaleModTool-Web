import {Alert, Button, Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useEffect, useState} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import {
	AudioEntryFlags,
	getSoundInfoByName,
} from '../../messages/getSoundInfoByName';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function getMimeType(buf: Uint8Array) {
	if (buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70) {
		return 'audio/wav';
	}

	if (buf[0] === 79 && buf[1] === 103 && buf[2] === 103 && buf[3] === 83) {
		return 'audio/ogg';
	}

	return null;
}

const soundByNameQueryOptions = (name: string) =>
	queryOptions({
		queryKey: ['sounds', name],
		queryFn() {
			return getSoundInfoByName(name);
		},
	});

function RouteComponent() {
	const {name} = useParams({
		from: '/_app/sounds/$name',
	});

	const {data} = useSuspenseQuery(soundByNameQueryOptions(name));
	const {
		FileContents: fileContents,
		Flags: flags,
		ExternalFileName: externalFileName,
		AudioGroupID: audioGroupID,
		AudioGroupName: audioGroupName,
	} = data;

	const [blobUrl, setBlobUrl] = useState<string | null>(null);

	useEffect(() => {
		if (fileContents.length <= 0) {
			return;
		}

		const mimeType = getMimeType(fileContents);

		const blob = new Blob([fileContents], {
			type: mimeType ?? 'application/octet-stream',
		});
		const url = window.URL.createObjectURL(blob);
		// eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect
		setBlobUrl(url);

		return () => {
			setBlobUrl(null);
			window.URL.revokeObjectURL(url);
		};
	}, [fileContents]);

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={[name, 'Sounds']} />

			<Title order={2}>{name}</Title>

			{blobUrl ? (
				<div>
					<Button component="a" href={blobUrl} download={name}>
						Export raw sound
					</Button>
				</div>
			) : null}

			{blobUrl ? (
				<audio src={blobUrl} controls style={{width: '100%'}} />
			) : null}

			{fileContents.length <= 0 ? (
				!(flags & AudioEntryFlags.IsEmbedded) ? (
					<Alert
						variant="light"
						color="blue"
						title="This audio file is stored externally."
					>
						Try looking for ‘{externalFileName}’ next to the data file.
					</Alert>
				) : audioGroupID !== 0 ? (
					<Alert
						variant="light"
						color="blue"
						title={`This audio file is stored on an external audio group${audioGroupName !== '' ? ` (${audioGroupName})` : ''}.`}
					>
						Try looking for ‘audiogroup{audioGroupID}
						.dat’ next to the data file.
					</Alert>
				) : (
					<BasicErrorAlert title="Cannot find audio file." />
				)
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/sounds/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(soundByNameQueryOptions(params.name)),
	errorComponent: ({error}) => {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message === 'NoMatch') {
				return (
					<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
						<BasicErrorAlert title="This sound does not exist." />
					</Stack>
				);
			}
		}

		throw error;
	},
});
