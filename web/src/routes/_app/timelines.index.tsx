import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {useDataStore} from '../../data-store';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const timelinesQueryOptions = queryOptions({
	queryKey: ['timelines'],
	queryFn() {
		return getEntriesByModelType(ModelType.Timelines);
	},
});

function Timelines() {
	const info = useDataStore((state) => state.gameInfo);

	const {data} = useSuspenseQuery(timelinesQueryOptions);

	return (
		<Stack>
			{info ? <DocumentTitle text="Timelines" /> : null}

			<SortableList
				id="Timelines"
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
