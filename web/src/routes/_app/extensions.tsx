import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useChildMatches,
} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import getSortableListItemLinkProps from '../../common/getSortableListItemLinkProps';
import SidebarAndContentView from '../../common/SidebarAndContentView';
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

	const onIndexPage = useChildMatches().length === 0;

	return (
		<Stack>
			<DocumentTitle text="Extensions" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="extensions"
						emptyListMessage="This game has no extensions."
						list={data.list}
						onIndexPage={onIndexPage}
						render={({text, searchHighlight}) => {
							return (
								<Link
									to="/extensions/$name"
									params={{name: text}}
									{...getSortableListItemLinkProps(text, searchHighlight)}
								/>
							);
						}}
					/>
				}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/extensions')({
	component: Extensions,
	loader: ({context}) => context.queryClient.query(extensionsQueryOptions),
});
