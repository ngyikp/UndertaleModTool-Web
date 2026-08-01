import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const audioGroupsQueryOptions = queryOptions({
	queryKey: ['audio-groups'],
	queryFn() {
		return getEntriesByModelType(ModelType.AudioGroups);
	},
});

function AudioGroups() {
	const {data} = useSuspenseQuery(audioGroupsQueryOptions);

	const listwithNumbers = data.list.map((entry, index) => {
		return index.toString() + '. ' + entry;
	});

	return (
		<Stack>
			<DocumentTitle text="Audio groups" />

			<SortableList
				id="audio-groups"
				emptyListMessage="This game has no audio groups."
				list={listwithNumbers}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/audio-groups/')({
	component: AudioGroups,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(audioGroupsQueryOptions),
});
