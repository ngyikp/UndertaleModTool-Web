import {Checkbox, Pagination, Title} from '@mantine/core';
import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {Suspense} from 'react';

import BasicLoadingMessage from '../../common/BasicLoadingMessage';
import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewLoading from '../../common/ContentViewLoading';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import DocumentTitle from '../../common/DocumentTitle';
import ImageAppearanceSelect from '../../common/image/ImageAppearanceSelect';
import TexturePageImageViewer from '../../common/image/TexturePageImageViewer';
import {embeddedTexturesInfoByIdQueryOptions} from '../../messages/getEmbeddedTextureInfoById';
import {spriteInfoByNameQueryOptions} from '../../messages/getSpriteInfoByName';
import {texturePageByIdQueryOptions} from '../../messages/getTexturePageInfoById';
import {useSpritesDataStore} from '../../stores/sprites-data-store';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

import styles from './sprites.$name.module.css';

const INVALID_TEXTURE_PAGE_ID = -1;

function RouteComponent() {
	const name = useParams({
		from: '/_app/sprites/$name',
		select: (params) => params.name,
	});

	const page = useSpritesDataStore((state) => state.getCurrentPage(name));
	const setPage = useSpritesDataStore((state) => state.setCurrentPage);
	const viewAll = useSpritesDataStore((state) => state.viewAll);
	const setViewAll = useSpritesDataStore((state) => state.setViewAll);

	const queryClient = useQueryClient();
	const {data} = useSuspenseQuery(spriteInfoByNameQueryOptions(name));

	const texturePageId = data.TexturePageIDs[page];
	const totalPages = data.TexturePageIDs.length;

	function prefetchListeners(num: number) {
		const newPage = data.TexturePageIDs[num - 1];
		if (newPage == null || newPage === INVALID_TEXTURE_PAGE_ID) {
			return {};
		}

		const prefetchPage = () => {
			void queryClient.prefetchQuery(texturePageByIdQueryOptions(newPage));
		};

		// todo these event listeners don't always fire, such as the user using keyboard
		return {
			onMouseEnter: prefetchPage,
			onMouseDown: prefetchPage,
			onFocus: prefetchPage,
		};
	}

	return (
		<ContentViewWithPadding>
			<DocumentTitle text={[name, 'Sprites']} />

			<Title order={2} className="break-word">
				{name}
			</Title>

			{totalPages > 1 ? (
				<Checkbox
					checked={viewAll}
					onChange={(event) => {
						setViewAll(event.currentTarget.checked);
					}}
					label={`View all ${totalPages.toString()} pages`}
				/>
			) : null}

			{viewAll && totalPages > 1 ? (
				<>
					<ImageAppearanceSelect />

					<Suspense fallback={<BasicLoadingMessage />}>
						<ol className={styles.list}>
							{data.TexturePageIDs.map((pageId, index) => {
								return (
									<li
										className={styles.listItem}
										key={
											texturePageId !== INVALID_TEXTURE_PAGE_ID
												? pageId
												: '!empty' + index.toString()
										}
									>
										{texturePageId !== INVALID_TEXTURE_PAGE_ID ? (
											<TexturePageImageViewer
												texturePageId={pageId}
												fileName={`${name} (page ${index.toString()})`}
												enableImageActions={false}
											/>
										) : (
											'(empty)'
										)}
									</li>
								);
							})}
						</ol>
					</Suspense>
				</>
			) : texturePageId != null ? (
				<Suspense fallback={<BasicLoadingMessage />}>
					{texturePageId !== INVALID_TEXTURE_PAGE_ID ? (
						<TexturePageImageViewer
							key={texturePageId}
							texturePageId={texturePageId}
							fileName={
								totalPages > 1
									? `${name} (page ${(page + 1).toString()})`
									: name
							}
							enableImageActions={true}
						/>
					) : (
						'(empty)'
					)}
				</Suspense>
			) : null}

			{!viewAll && totalPages > 1 ? (
				<Pagination
					total={totalPages}
					value={page + 1}
					onChange={(newPage) => {
						setPage(name, newPage - 1);
					}}
					py="md"
					getItemProps={(page) => prefetchListeners(page)}
					getControlProps={(control) => {
						if (control === 'next') {
							return prefetchListeners(page + 2);
						}

						if (control === 'previous') {
							return prefetchListeners(page);
						}

						return {};
					}}
				/>
			) : null}
		</ContentViewWithPadding>
	);
}

export const Route = createFileRoute('/_app/sprites/$name')({
	component: RouteComponent,
	loader: async ({context, params}) => {
		const spriteInfo = await context.queryClient.ensureQueryData(
			spriteInfoByNameQueryOptions(params.name),
		);

		// Prefetch the first page
		if (
			spriteInfo.TexturePageIDs[0] &&
			spriteInfo.TexturePageIDs[0] !== INVALID_TEXTURE_PAGE_ID
		) {
			const texturePageData = await context.queryClient.ensureQueryData(
				texturePageByIdQueryOptions(spriteInfo.TexturePageIDs[0]),
			);

			await context.queryClient.ensureQueryData(
				embeddedTexturesInfoByIdQueryOptions(texturePageData.EmbeddedTextureID),
			);
		}

		return spriteInfo;
	},
	errorComponent({error}) {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message === 'NoMatch') {
				return <ContentViewAlert title="This sprite does not exist." />;
			}
		}

		return <ContentViewAlert error={error} />;
	},
	pendingComponent: () => <ContentViewLoading text="Loading sprite..." />,
});
