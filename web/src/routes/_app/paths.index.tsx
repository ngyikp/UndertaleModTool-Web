import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {useDataStore} from '../../data-store';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const pathsQueryOptions = queryOptions({
	queryKey: ['paths'],
	queryFn() {
		return getEntriesByModelType(ModelType.Paths);
	},
});

function Paths() {
	const info = useDataStore((state) => state.gameInfo);

	const {data} = useSuspenseQuery(pathsQueryOptions);

	return (
		<Stack>
			{info ? <DocumentTitle text="Paths" /> : null}

			<SortableList
				id="paths"
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/paths/')({
	component: Paths,
	loader: ({context}) => context.queryClient.ensureQueryData(pathsQueryOptions),
});
