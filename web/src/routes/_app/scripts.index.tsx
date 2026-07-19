import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {useDataStore} from '../../data-store';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const scriptsQueryOptions = queryOptions({
	queryKey: ['scripts'],
	queryFn() {
		return getEntriesByModelType(ModelType.Scripts);
	},
});

function Scripts() {
	const info = useDataStore((state) => state.gameInfo);

	const {data} = useSuspenseQuery(scriptsQueryOptions);

	return (
		<Stack>
			{info ? <DocumentTitle text="Scripts" /> : null}

			<SortableList
				id="scripts"
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/scripts/')({
	component: Scripts,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(scriptsQueryOptions),
});
