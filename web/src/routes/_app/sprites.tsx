import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useChildMatches,
} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SidebarAndContentView from '../../common/SidebarAndContentView';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const spritesQueryOptions = queryOptions({
	queryKey: ['sprites'],
	queryFn() {
		return getEntriesByModelType(ModelType.Sprites);
	},
});

function Sprites() {
	const {data} = useSuspenseQuery(spritesQueryOptions);

	const onIndexPage = useChildMatches().length === 0;

	return (
		<>
			<DocumentTitle text="Sprites" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="sprites"
						emptyListMessage="This game has no sprites."
						list={data.list}
						onIndexPage={onIndexPage}
						render={(item) => {
							return (
								<Link
									to="/sprites/$name"
									params={{name: item}}
									preload="intent"
									preloadDelay={250}
									activeProps={{style: {fontWeight: 'bold'}}}
									resetScroll={false}
								>
									{item}
								</Link>
							);
						}}
					/>
				}
			/>
		</>
	);
}

export const Route = createFileRoute('/_app/sprites')({
	component: Sprites,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(spritesQueryOptions),
});
