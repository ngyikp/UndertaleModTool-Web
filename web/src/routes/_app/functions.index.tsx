import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import YycWarningAlert from '../../common/YycWarningAlert';
import {useDataStore} from '../../data-store';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const functionsQueryOptions = queryOptions({
	queryKey: ['functions'],
	queryFn() {
		return getEntriesByModelType(ModelType.Functions);
	},
});

function Functions() {
	const info = useDataStore((state) => state.gameInfo);

	const {data} = useSuspenseQuery(functionsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Functions" />

			<SortableList
				id="paths"
				emptyListMessage={
					info?.IsYYC ? <YycWarningAlert /> : 'This game has no functions.'
				}
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/functions/')({
	component: Functions,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(functionsQueryOptions),
});
