import {Alert, Button, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useMemo} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewLoading from '../../common/ContentViewLoading';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import detectMimeType from '../../common/detectMimeType';
import DocumentTitle from '../../common/DocumentTitle';
import useBlobAsUrl from '../../common/image/useBlobAsUrl';
import {
	AudioEntryFlags,
	getSoundInfoByName,
} from '../../messages/getSoundInfoByName';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

const soundByNameQueryOptions = (name: string) =>
	queryOptions({
		queryKey: ['sounds', name],
		queryFn() {
			return getSoundInfoByName(name);
		},
	});

function RouteComponent() {
	const name = useParams({
		from: '/_app/sounds/$name',
		select: (params) => params.name,
	});

	const {data} = useSuspenseQuery(soundByNameQueryOptions(name));
	const {
		FileContents: fileContents,
		Flags: flags,
		ExternalFileName: externalFileName,
		AudioGroupID: audioGroupID,
		AudioGroupName: audioGroupName,
	} = data;

	const blob = useMemo(() => {
		if (fileContents.length <= 0) {
			return null;
		}

		const mimeType = detectMimeType(fileContents);

		return new Blob([fileContents], {
			type: mimeType ?? 'application/octet-stream',
		});
	}, [fileContents]);
	const blobUrl = useBlobAsUrl(blob);

	return (
		<ContentViewWithPadding>
			<DocumentTitle text={[name, 'Sounds']} />

			<Title order={2} className="break-word">
				{name}
			</Title>

			{blobUrl ? (
				<div>
					<Button
						component="a"
						href={blobUrl}
						download={name}
						variant="default"
					>
						Export sound
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
		</ContentViewWithPadding>
	);
}

export const Route = createFileRoute('/_app/sounds/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(soundByNameQueryOptions(params.name)),
	errorComponent({error}) {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message === 'NoMatch') {
				return <ContentViewAlert title="This sound does not exist." />;
			}
		}

		return <ContentViewAlert error={error} />;
	},
	pendingComponent: () => <ContentViewLoading text="Loading sound..." />,
});
