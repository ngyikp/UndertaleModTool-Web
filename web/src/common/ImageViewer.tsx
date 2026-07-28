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

	withActions?: boolean;
	downloadButtonText?: string;
}>;

export default function ImageViewer({
	blob,
	fileName,
	width,
	height,

	withActions = false,
	downloadButtonText = 'Export image',
}: Props) {
	const settings = useDataStore((state) => state.imageViewerSettings);

	const blobUrl = useBlobAsUrl(blob);

	return (
		<>
			{withActions ? (
				<Group>
					<ImageAppearanceSelect />

					<Button.Group ml="auto">
						<Button
							component="a"
							href={blobUrl != null ? blobUrl : undefined}
							download={fileName}
							disabled={blobUrl == null}
							variant="default"
						>
							{downloadButtonText}
						</Button>

						<CustomCopyButton label="Copy image" value={blob} />
					</Button.Group>
				</Group>
			) : null}

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
