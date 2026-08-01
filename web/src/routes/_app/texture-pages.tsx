import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useChildMatches,
} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import renderSearchHighlight from '../../common/renderSearchHighlight';
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

// https://manual.gamemaker.io/monthly/en/Settings/Texture_Information/Texture_Pages.htm
function TexturePages() {
	const {data} = useSuspenseQuery(texturePagesQueryOptions);

	const onIndexPage = useChildMatches().length === 0;

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
						render={(item, searchHighlight) => {
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
									resetScroll={false}
								>
									{renderSearchHighlight(item, searchHighlight)}
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
