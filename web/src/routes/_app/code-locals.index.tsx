import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import YycWarningAlert from '../../common/YycWarningAlert';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {getGameInfoQueryOptions} from '../../messages/getGameInfo';
import {ModelType} from '../../types/ModelType';

const codeLocalsQueryOptions = queryOptions({
	queryKey: ['code-locals'],
	queryFn() {
		return getEntriesByModelType(ModelType.CodeLocals);
	},
});

function CodeLocals() {
	const {data: gameInfo} = useSuspenseQuery(getGameInfoQueryOptions());
	const {data} = useSuspenseQuery(codeLocalsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Code locals" />

			<SortableList
				id="code-locals"
				emptyListMessage={
					gameInfo?.IsYYC ? (
						<YycWarningAlert />
					) : (
						'This game has no code locals.'
					)
				}
				list={data.list}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code-locals/')({
	component: CodeLocals,
	loader: ({context}) => context.queryClient.query(codeLocalsQueryOptions),
});
