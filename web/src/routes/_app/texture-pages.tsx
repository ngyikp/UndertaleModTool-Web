import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useMatchRoute,
} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SidebarAndContentView from '../../common/SidebarAndContentView';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const texturePagesQueryOptions = queryOptions({
	queryKey: ['texture-pages'],
	queryFn() {
		return getEntriesByModelType(ModelType.TexturePageItems);
	},
});

// Workaround React Compiler bug
// https://github.com/TanStack/router/issues/4499
function useIsOnIndexPage() {
	'use no memo';

	const matchRoute = useMatchRoute();
	return matchRoute({to: '/texture-pages'}) !== false;
}

// https://manual.gamemaker.io/monthly/en/Settings/Texture_Information/Texture_Pages.htm
function TexturePages() {
	const {data} = useSuspenseQuery(texturePagesQueryOptions);

	const onIndexPage = useIsOnIndexPage();

	return (
		<Stack>
			<DocumentTitle text="Texture pages" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="texture-pages"
						emptyListMessage="This game has no texture pages."
						list={data.list}
						onIndexPage={onIndexPage}
						render={(item) => {
							// Name is set by UMT, the game data itself does not set names for texture pages
							// hhttps://github.com/UnderminersTeam/UndertaleModTool/blob/2b6fe69722cec25219f1ae21f8111907c2a15629/UndertaleModLib/UndertaleChunks.cs#L1667
							const id = parseInt(item.replace('PageItem ', ''), 10);

							return (
								<Link
									to="/texture-pages/$id"
									params={{id}}
									preload="intent"
									preloadDelay={250}
									activeProps={{style: {fontWeight: 'bold'}}}
								>
									{item}
								</Link>
							);
						}}
					/>
				}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/texture-pages')({
	component: TexturePages,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(texturePagesQueryOptions),
});
