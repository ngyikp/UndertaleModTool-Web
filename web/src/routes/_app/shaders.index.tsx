import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const shadersQueryOptions = queryOptions({
	queryKey: ['shaders'],
	queryFn() {
		return getEntriesByModelType(ModelType.Shaders);
	},
});

function Shaders() {
	const {data} = useSuspenseQuery(shadersQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Shaders" />

			<SortableList
				id="shaders"
				emptyListMessage="This game has no shaders."
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/shaders/')({
	component: Shaders,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(shadersQueryOptions),
});
