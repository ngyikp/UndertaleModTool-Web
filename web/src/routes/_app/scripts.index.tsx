import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const scriptsQueryOptions = queryOptions({
	queryKey: ['scripts'],
	queryFn() {
		return getEntriesByModelType(ModelType.Scripts);
	},
});

function Scripts() {
	const {data} = useSuspenseQuery(scriptsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Scripts" />

			<SortableList
				id="scripts"
				emptyListMessage="This game has no scripts."
				list={data.list}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/scripts/')({
	component: Scripts,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(scriptsQueryOptions),
});
