import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const objectsQueryOptions = queryOptions({
	queryKey: ['objects'],
	queryFn() {
		return getEntriesByModelType(ModelType.GameObjects);
	},
});

// GameMaker calls these as 'objects'
// UMT calls these as 'game objects'
// https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm
function Objects() {
	const {data} = useSuspenseQuery(objectsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Objects" />

			<SortableList
				id="objects"
				emptyListMessage="This game has no objects."
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/objects/')({
	component: Objects,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(objectsQueryOptions),
});
