import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import YycWarningAlert from '../../common/YycWarningAlert';
import {useDataStore} from '../../data-store';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const variablesQueryOptions = queryOptions({
	queryKey: ['variables'],
	queryFn() {
		return getEntriesByModelType(ModelType.Variables);
	},
});

function Variables() {
	const info = useDataStore((state) => state.gameInfo);

	const {data} = useSuspenseQuery(variablesQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Variables" />

			<SortableList
				id="variables"
				emptyListMessage={
					info?.IsYYC ? <YycWarningAlert /> : 'This game has no variables.'
				}
				itemsAreNonUnique={true}
				list={data.list}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/variables/')({
	component: Variables,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(variablesQueryOptions),
});
