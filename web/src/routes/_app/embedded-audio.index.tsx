import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const embeddedAudioQueryOptions = queryOptions({
	queryKey: ['embedded-audio'],
	queryFn() {
		return getEntriesByModelType(ModelType.EmbeddedAudio);
	},
});

function EmbeddedAudio() {
	const {data} = useSuspenseQuery(embeddedAudioQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Embedded audio" />

			<SortableList
				id="embedded-audio"
				emptyListMessage="This game has no embedded audio."
				list={data.list}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/embedded-audio/')({
	component: EmbeddedAudio,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(embeddedAudioQueryOptions),
});
