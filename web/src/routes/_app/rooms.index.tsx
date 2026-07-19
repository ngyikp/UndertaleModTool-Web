import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const roomsQueryOptions = queryOptions({
	queryKey: ['rooms'],
	queryFn() {
		return getEntriesByModelType(ModelType.Rooms);
	},
});

function Rooms() {
	const {data} = useSuspenseQuery(roomsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Rooms" />

			<SortableList
				id="rooms"
				emptyListMessage="This game has no rooms."
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/rooms/')({
	component: Rooms,
	loader: ({context}) => context.queryClient.ensureQueryData(roomsQueryOptions),
});
