import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import YycWarningAlert from '../../common/YycWarningAlert';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {getGameInfoQueryOptions} from '../../messages/getGameInfo';
import {ModelType} from '../../types/ModelType';

const variablesQueryOptions = queryOptions({
	queryKey: ['variables'],
	queryFn() {
		return getEntriesByModelType(ModelType.Variables);
	},
});

function Variables() {
	const {data: gameInfo} = useSuspenseQuery(getGameInfoQueryOptions());
	const {data} = useSuspenseQuery(variablesQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Variables" />

			<SortableList
				id="variables"
				emptyListMessage={
					gameInfo?.IsYYC ? <YycWarningAlert /> : 'This game has no variables.'
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
	loader: ({context}) => context.queryClient.query(variablesQueryOptions),
});
