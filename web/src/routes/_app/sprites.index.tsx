import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const spritesQueryOptions = queryOptions({
	queryKey: ['sprites'],
	queryFn() {
		return getEntriesByModelType(ModelType.Sprites);
	},
});

function Sprites() {
	const {data} = useSuspenseQuery(spritesQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Sprites" />

			<SortableList
				id="sprites"
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/sprites/')({
	component: Sprites,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(spritesQueryOptions),
});
