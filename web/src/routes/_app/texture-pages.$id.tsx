import {Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Link, useParams} from '@tanstack/react-router';
import {useEffect, useState} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import ImageViewer from '../../common/ImageViewer';
import {getTexturePageInfoById} from '../../messages/getTexturePageInfoById';

import {embeddedTexturesByIdQueryOptions} from './embedded-textures.$id';

const texturePageByIdQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ['texture-pages', id],
		queryFn() {
			return getTexturePageInfoById(id);
		},
	});

function RouteComponent() {
	const {id} = useParams({
		from: '/_app/texture-pages/$id',
	});

	const {data: texturePageData} = useSuspenseQuery(
		texturePageByIdQueryOptions(parseInt(id, 10)),
	);
	const {data: embeddedTextureData} = useSuspenseQuery(
		embeddedTexturesByIdQueryOptions(texturePageData.EmbeddedTextureID),
	);

	const [finalBlob, setFinalBlob] = useState<Blob | null>(null);

	useEffect(() => {
		// todo add includePadding parameter
		async function drawImage() {
			if (embeddedTextureData.Format !== 'Png') {
				return;
			}

			const canvas = document.createElement('canvas');
			canvas.width = texturePageData.SourceWidth;
			canvas.height = texturePageData.SourceHeight;

			const ctx = canvas.getContext('2d', {alpha: true});
			if (!ctx) {
				throw new Error('Canvas rendering context is missing');
			}

			// Based on https://github.com/UnderminersTeam/UndertaleModTool/blob/2b6fe69722cec25219f1ae21f8111907c2a15629/UndertaleModLib/Util/TextureWorker.cs#L63
			// Create an image cropped from the item's part of the texture page
			const imageBitmap = await createImageBitmap(
				new Blob([embeddedTextureData.FileContents], {
					type: 'image/png',
				}),
				texturePageData.SourceX,
				texturePageData.SourceY,
				texturePageData.SourceWidth,
				texturePageData.SourceHeight,
			);

			ctx.drawImage(imageBitmap, 0, 0);

			// Resize the image, if necessary
			if (
				texturePageData.SourceWidth !== texturePageData.TargetWidth ||
				texturePageData.SourceHeight !== texturePageData.TargetHeight
			) {
				const resizeWidth = texturePageData.TargetWidth;
				const resizeHeight = texturePageData.TargetHeight;
				if (canvas.width !== resizeWidth || canvas.height !== resizeHeight) {
					ctx.drawImage(imageBitmap, 0, 0, resizeWidth, resizeHeight);
				}
			}

			canvas.toBlob((croppedImageBlob) => {
				if (croppedImageBlob == null) {
					throw new Error('Failed to render canvas image');
				}

				setFinalBlob(croppedImageBlob);
			});
		}

		void drawImage();

		return () => {
			setFinalBlob(null);
		};
	}, [
		embeddedTextureData.FileContents,
		embeddedTextureData.Format,
		texturePageData.SourceHeight,
		texturePageData.SourceWidth,
		texturePageData.SourceX,
		texturePageData.SourceY,
		texturePageData.TargetHeight,
		texturePageData.TargetWidth,
	]);

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={['Texture ' + id, 'Texture pages']} />

			<Title order={2}>Texture {id}</Title>

			<p>
				Source position: {texturePageData.SourceX}x{texturePageData.SourceY}
				<br />
				Source size: {texturePageData.SourceWidth}x
				{texturePageData.SourceHeight}
			</p>

			<p>
				Target position: {texturePageData.TargetX}x{texturePageData.TargetY}
				<br />
				Target size: {texturePageData.TargetWidth}x
				{texturePageData.TargetHeight}
			</p>

			<p>
				Bounding size: {texturePageData.BoundingWidth}x
				{texturePageData.BoundingHeight}
			</p>

			<p>
				<Link
					to="/embedded-textures/$id"
					params={{id: texturePageData.EmbeddedTextureID.toString()}}
				>
					Go to embedded texture {texturePageData.EmbeddedTextureID}
				</Link>
			</p>

			{finalBlob ? (
				<ImageViewer
					blob={finalBlob}
					fileName={'Texture ' + id}
					mimeType="image/png"
				/>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/texture-pages/$id')({
	component: RouteComponent,
	loader: async ({context, params}) => {
		const texturePageData = await context.queryClient.ensureQueryData(
			texturePageByIdQueryOptions(parseInt(params.id, 10)),
		);

		await context.queryClient.ensureQueryData(
			embeddedTexturesByIdQueryOptions(texturePageData.EmbeddedTextureID),
		);

		return texturePageData;
	},
	errorComponent: ({error}) => {
		if (error.message === 'NoMatch') {
			return (
				<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
					<BasicErrorAlert title="This texture page does not exist." />
				</Stack>
			);
		}

		throw error;
	},
});
