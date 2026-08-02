import {Button, Title} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useMemo} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewLoading from '../../common/ContentViewLoading';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import detectMimeType from '../../common/detectMimeType';
import DocumentTitle from '../../common/DocumentTitle';
import useBlobAsUrl from '../../common/image/useBlobAsUrl';
import {embeddedAudioByIdQueryOptions} from '../../messages/getEmbeddedAudioInfoById';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function RouteComponent() {
	const id = useParams({
		from: '/_app/embedded-audio/$id',
		select: (params) => params.id,
	});

	const {data} = useSuspenseQuery(embeddedAudioByIdQueryOptions(id));
	const {FileContents: fileContents} = data;
	const title = 'EmbeddedSound ' + id.toString();

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
			<DocumentTitle text={[title, 'Embedded audio']} />

			<Title order={2} className="break-word">
				{title}
			</Title>

			{blobUrl ? (
				<div>
					<Button
						component="a"
						href={blobUrl}
						download={title}
						variant="default"
					>
						Export raw audio
					</Button>
				</div>
			) : null}

			{blobUrl ? (
				<audio src={blobUrl} controls style={{width: '100%'}} />
			) : null}

			{fileContents.length <= 0 ? (
				<BasicErrorAlert title="Cannot find audio file." />
			) : null}
		</ContentViewWithPadding>
	);
}

export const Route = createFileRoute('/_app/embedded-audio/$id')({
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
			embeddedAudioByIdQueryOptions(params.id),
		),
	errorComponent({error}) {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message.startsWith('ArgumentOutOfRange')) {
				return <ContentViewAlert title="This embedded audio does not exist." />;
			}
		}

		return <ContentViewAlert error={error} />;
	},
	pendingComponent: () => (
		<ContentViewLoading text="Loading embedded audio..." />
	),
});
