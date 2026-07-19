import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const timelinesQueryOptions = queryOptions({
	queryKey: ['timelines'],
	queryFn() {
		return getEntriesByModelType(ModelType.Timelines);
	},
});

function Timelines() {
	const {data} = useSuspenseQuery(timelinesQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Timelines" />

			<SortableList
				id="Timelines"
				emptyListMessage="This game has no timelines."
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/timelines/')({
	component: Timelines,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(timelinesQueryOptions),
});
