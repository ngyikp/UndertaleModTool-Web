import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import getTileSetsLabel from '../../common/getTileSetsLabel';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {getGameInfoQueryOptions} from '../../messages/getGameInfo';
import {ModelType} from '../../types/ModelType';

const backgroundsQueryOptions = queryOptions({
	queryKey: ['backgrounds'],
	queryFn() {
		return getEntriesByModelType(ModelType.Backgrounds);
	},
});

// UMT calls these as 'backgrounds' internally
function Tilesets() {
	const {data: gameInfo} = useSuspenseQuery(getGameInfoQueryOptions());
	const {data} = useSuspenseQuery(backgroundsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text={getTileSetsLabel(gameInfo, true)} />

			<SortableList
				id="backgrounds"
				emptyListMessage={`This game has no ${getTileSetsLabel(gameInfo)}.`}
				list={data.list}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/tile-sets/')({
	component: Tilesets,
	loader: ({context}) => context.queryClient.query(backgroundsQueryOptions),
});
