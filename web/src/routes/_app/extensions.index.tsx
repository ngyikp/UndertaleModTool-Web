import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const extensionsQueryOptions = queryOptions({
	queryKey: ['extensions'],
	queryFn() {
		return getEntriesByModelType(ModelType.Extensions);
	},
});

function Extensions() {
	const {data} = useSuspenseQuery(extensionsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Extensions" />

			<SortableList
				id="extensions"
				emptyListMessage="This game has no extensions."
				list={data.list}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/extensions/')({
	component: Extensions,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(extensionsQueryOptions),
});
