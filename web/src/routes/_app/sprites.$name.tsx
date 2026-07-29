import {Checkbox, Pagination, Title} from '@mantine/core';
import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {Suspense, useState} from 'react';

import BasicLoadingMessage from '../../common/BasicLoadingMessage';
import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import DocumentTitle from '../../common/DocumentTitle';
import ImageAppearanceSelect from '../../common/image/ImageAppearanceSelect';
import TexturePageImageViewer from '../../common/TexturePageImageViewer';
import {useDataStore} from '../../data-store';
import {embeddedTexturesInfoByIdQueryOptions} from '../../messages/getEmbeddedTextureInfoById';
import {spriteInfoByNameQueryOptions} from '../../messages/getSpriteInfoByName';
import {texturePageByIdQueryOptions} from '../../messages/getTexturePageInfoById';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function RouteComponent() {
	const name = useParams({
		from: '/_app/sprites/$name',
		select: (params) => params.name,
	});

	const page = useDataStore((state) => state.getSpriteTextureCurrentPage(name));
	const setPage = useDataStore((state) => state.setSpriteTextureCurrentPage);
	const [viewAll, setViewAll] = useState(false);

	const queryClient = useQueryClient();
	const {data} = useSuspenseQuery(spriteInfoByNameQueryOptions(name));

	const texturePage = data.TexturePageIDs[page];

	function prefetchListeners(num: number) {
		const prefetchPage = () => {
			const newPage = data.TexturePageIDs[num - 1];
			if (newPage) {
				void queryClient.prefetchQuery(texturePageByIdQueryOptions(newPage));
			}
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

			<Title order={2}>{name}</Title>

			{data.TexturePageIDs.length > 1 ? (
				<Checkbox
					checked={viewAll}
					onChange={(event) => {
						setViewAll(event.currentTarget.checked);
					}}
					label="View all"
				/>
			) : null}

			{viewAll ? (
				<>
					<ImageAppearanceSelect />

					{data.TexturePageIDs.map((page) => {
						return (
							<TexturePageImageViewer
								key={page}
								texturePageId={page}
								enableImageActions={false}
							/>
						);
					})}
				</>
			) : texturePage ? (
				<Suspense fallback={<BasicLoadingMessage />}>
					<TexturePageImageViewer
						key={texturePage}
						texturePageId={texturePage}
						enableImageActions={true}
					/>
				</Suspense>
			) : null}

			{!viewAll && data.TexturePageIDs.length > 1 ? (
				<Pagination
					total={data.TexturePageIDs.length}
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

		if (spriteInfo.TexturePageIDs[0]) {
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
});
