import {Button, Group} from '@mantine/core';

import {useDataStore} from '../data-store';

import CustomCopyButton from './CustomCopyButton';
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

				<Button.Group ml="auto">
					{enableDownload ? (
						<Button
							component="a"
							href={blobUrl != null ? blobUrl : undefined}
							download={fileName}
							disabled={blobUrl == null}
							variant="default"
						>
							{downloadButtonText}
						</Button>
					) : null}

					<CustomCopyButton label="Copy image" value={blob} />
				</Button.Group>
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
