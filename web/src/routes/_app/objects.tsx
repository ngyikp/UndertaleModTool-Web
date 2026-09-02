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

const objectsQueryOptions = queryOptions({
	queryKey: ['objects'],
	queryFn() {
		return getEntriesByModelType(ModelType.GameObjects);
	},
});

// GameMaker calls these as 'objects'
// UMT calls these as 'game objects'
// https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Objects.htm
function Objects() {
	const {data} = useSuspenseQuery(objectsQueryOptions);

	const onIndexPage = useChildMatches().length === 0;

	return (
		<Stack>
			<DocumentTitle text="Objects" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="objects"
						emptyListMessage="This game has no objects."
						list={data.list}
						onIndexPage={onIndexPage}
						render={({text, searchHighlight}) => {
							return (
								<Link
									to="/objects/$name"
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

export const Route = createFileRoute('/_app/objects')({
	component: Objects,
	loader: ({context}) => context.queryClient.query(objectsQueryOptions),
});
