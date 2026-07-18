import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import getTileSetsLabel from '../../common/getTileSetsLabel';
import SortableList from '../../common/SortableList';
import {useDataStore} from '../../data-store';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const backgroundsQueryOptions = queryOptions({
	queryKey: ['backgrounds'],
	queryFn() {
		return getEntriesByModelType(ModelType.Backgrounds);
	},
});

// UMT calls these as 'backgrounds' internally
function Tilesets() {
	const info = useDataStore((state) => state.gameInfo);

	const {data} = useSuspenseQuery(backgroundsQueryOptions);

	return (
		<Stack>
			{info ? <DocumentTitle text={getTileSetsLabel(info, true)} /> : null}

			<SortableList
				id="backgrounds"
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/tile-sets/')({
	component: Tilesets,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(backgroundsQueryOptions),
});
