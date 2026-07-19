import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const texturePageItemsQueryOptions = queryOptions({
	queryKey: ['texture-page-items'],
	queryFn() {
		return getEntriesByModelType(ModelType.TexturePageItems);
	},
});

function TexturePageItems() {
	const {data} = useSuspenseQuery(texturePageItemsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Texture page items" />

			<SortableList
				id="paths"
				emptyListMessage="This game has no texture page items."
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/texture-page-items/')({
	component: TexturePageItems,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(texturePageItemsQueryOptions),
});
