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

const embeddedAudioQueryOptions = queryOptions({
	queryKey: ['embedded-audio'],
	queryFn() {
		return getEntriesByModelType(ModelType.EmbeddedAudio);
	},
});

function EmbeddedAudio() {
	const {data} = useSuspenseQuery(embeddedAudioQueryOptions);

	const onIndexPage = useChildMatches().length === 0;

	return (
		<Stack>
			<DocumentTitle text="Embedded audio" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="embedded-audio"
						emptyListMessage="This game has no embedded audio."
						list={data.list}
						onIndexPage={onIndexPage}
						render={(item, searchHighlight) => {
							// Name is set by UMT, the game data itself does not set names for embedded audio
							// https://github.com/UnderminersTeam/UndertaleModTool/blob/2b6fe69722cec25219f1ae21f8111907c2a15629/UndertaleModLib/UndertaleChunks.cs#L2227
							const id = parseInt(item.replace('EmbeddedSound ', ''), 10);

							return (
								<Link
									to="/embedded-audio/$id"
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

export const Route = createFileRoute('/_app/embedded-audio')({
	component: EmbeddedAudio,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(embeddedAudioQueryOptions),
});
