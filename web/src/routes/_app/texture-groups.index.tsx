import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const textureGroupsQueryOptions = queryOptions({
	queryKey: ['texture-groups'],
	queryFn() {
		return getEntriesByModelType(ModelType.TextureGroupInfo);
	},
});

// https://manual.gamemaker.io/monthly/en/Settings/Texture_Groups.htm
function TextureGroups() {
	const {data} = useSuspenseQuery(textureGroupsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Texture groups" />

			<SortableList
				id="texture-groups"
				emptyListMessage="This game has no texture groups."
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/texture-groups/')({
	component: TextureGroups,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(textureGroupsQueryOptions),
});
