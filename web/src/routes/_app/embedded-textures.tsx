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

const embeddedTexturesQueryOptions = queryOptions({
	queryKey: ['embedded-textures'],
	queryFn() {
		return getEntriesByModelType(ModelType.EmbeddedTextures);
	},
});

function EmbeddedTextures() {
	const {data} = useSuspenseQuery(embeddedTexturesQueryOptions);

	const onIndexPage = useChildMatches().length === 0;

	return (
		<>
			<DocumentTitle text="Embedded textures" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="embedded-textures"
						emptyListMessage="This game has no embedded textures."
						list={data.list}
						onIndexPage={onIndexPage}
						render={(item) => {
							// Name is set by UMT, the game data itself does not set names for embedded textures
							// https://github.com/UnderminersTeam/UndertaleModTool/blob/2b6fe69722cec25219f1ae21f8111907c2a15629/UndertaleModLib/UndertaleChunks.cs#L2189
							const id = parseInt(item.replace('Texture ', ''), 10);

							return (
								<Link
									to="/embedded-textures/$id"
									params={{id}}
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

export const Route = createFileRoute('/_app/embedded-textures')({
	component: EmbeddedTextures,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(embeddedTexturesQueryOptions),
});
