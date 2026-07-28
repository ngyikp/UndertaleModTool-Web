import {Button, Group} from '@mantine/core';

import {useDataStore} from '../data-store';

import ImageAppearanceSelect from './image/ImageAppearanceSelect';
import type {Appearance} from './image/ImageAppearanceType';
import ImageWithPlaceholder from './image/ImageWithPlaceholder';
import {useBlobAsUrl} from './image/useBlobAsUrl';

export type ImageViewerSettings = {
	appearance: Appearance;
};

type Props = Readonly<{
	blob: Blob | null;
	fileName: string;
	width: number;
	height: number;

	enableDownload?: boolean;
	downloadButtonText?: string;
}>;

export default function ImageViewer({
	blob,
	fileName,
	width,
	height,

	enableDownload = true,
	downloadButtonText = 'Export image',
}: Props) {
	const settings = useDataStore((state) => state.imageViewerSettings);

	const blobUrl = useBlobAsUrl(blob);

	return (
		<>
			<Group>
				<ImageAppearanceSelect />

				{enableDownload ? (
					<Button
						component="a"
						href={blobUrl != null ? blobUrl : undefined}
						download={fileName}
						disabled={blobUrl == null}
						variant="default"
						ml="auto"
					>
						{downloadButtonText}
					</Button>
				) : null}
			</Group>

			<ImageWithPlaceholder
				src={blobUrl}
				width={width}
				height={height}
				appearance={settings.appearance}
				alt={fileName}
			/>
		</>
	);
}
