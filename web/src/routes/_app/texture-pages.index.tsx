import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const texturePagesQueryOptions = queryOptions({
	queryKey: ['texture-pages'],
	queryFn() {
		return getEntriesByModelType(ModelType.TexturePageItems);
	},
});

// https://manual.gamemaker.io/monthly/en/Settings/Texture_Information/Texture_Pages.htm
function TexturePages() {
	const {data} = useSuspenseQuery(texturePagesQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Texture pages" />

			<SortableList
				id="paths"
				emptyListMessage="This game has no texture pages."
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/texture-pages/')({
	component: TexturePages,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(texturePagesQueryOptions),
});
