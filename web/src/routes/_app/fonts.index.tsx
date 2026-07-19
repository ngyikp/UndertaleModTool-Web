import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const fontsQueryOptions = queryOptions({
	queryKey: ['fonts'],
	queryFn() {
		return getEntriesByModelType(ModelType.Fonts);
	},
});

function Fonts() {
	const {data} = useSuspenseQuery(fontsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Fonts" />

			<SortableList
				id="fonts"
				emptyListMessage="This game has no fonts."
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/fonts/')({
	component: Fonts,
	loader: ({context}) => context.queryClient.ensureQueryData(fontsQueryOptions),
});
