import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import YycWarningAlert from '../../common/YycWarningAlert';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {getGameInfoQueryOptions} from '../../messages/getGameInfo';
import {ModelType} from '../../types/ModelType';

const functionsQueryOptions = queryOptions({
	queryKey: ['functions'],
	queryFn() {
		return getEntriesByModelType(ModelType.Functions);
	},
});

function Functions() {
	const {data: gameInfo} = useSuspenseQuery(getGameInfoQueryOptions());
	const {data} = useSuspenseQuery(functionsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Functions" />

			<SortableList
				id="functions"
				emptyListMessage={
					gameInfo?.IsYYC ? <YycWarningAlert /> : 'This game has no functions.'
				}
				list={data.list}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/functions/')({
	component: Functions,
	loader: ({context}) => context.queryClient.query(functionsQueryOptions),
});
