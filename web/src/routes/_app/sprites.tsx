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
import SpriteSidebarItemThumbnailLink from '../../components/SpriteSidebarItemThumbnailLink';
import SpriteSidebarView from '../../components/SpriteSidebarView';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {useSpritesDataStore} from '../../stores/sprites-data-store';
import {ModelType} from '../../types/ModelType';

import styles from './sprites.module.css';

const spritesQueryOptions = queryOptions({
	queryKey: ['sprites'],
	queryFn() {
		return getEntriesByModelType(ModelType.Sprites);
	},
});

function Sprites() {
	const viewMode = useSpritesDataStore((state) => state.viewMode);
	const thumbnailSize = useSpritesDataStore((state) => state.thumbnailSize);

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
						extraBelowItemCounts={<SpriteSidebarView />}
						list={data.list}
						listClassName={
							viewMode === 'THUMBNAIL' ? styles.thumbnailList : undefined
						}
						listStyles={
							viewMode === 'THUMBNAIL'
								? ({
										'--sprites-size': thumbnailSize.toString() + 'px',
									} as React.CSSProperties)
								: undefined
						}
						onIndexPage={onIndexPage}
						render={({text, searchHighlight}) => {
							switch (viewMode) {
								case 'LIST':
									return (
										<Link
											to="/sprites/$name"
											params={{name: text}}
											{...getSortableListItemLinkProps(text, searchHighlight)}
										/>
									);

								case 'THUMBNAIL':
									return (
										<SpriteSidebarItemThumbnailLink
											text={text}
											searchHighlight={searchHighlight}
										/>
									);

								default:
									throw new Error('Unknown view mode');
							}
						}}
					/>
				}
			/>
		</>
	);
}

export const Route = createFileRoute('/_app/sprites')({
	component: Sprites,
	loader: ({context}) => context.queryClient.query(spritesQueryOptions),
});
