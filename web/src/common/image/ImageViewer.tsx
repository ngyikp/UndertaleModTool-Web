import {useDataStore} from '../../data-store';

import type {Appearance} from './ImageAppearanceType';
import ImageViewerActions from './ImageViewerActions';
import ImageWithPlaceholder from './ImageWithPlaceholder';
import useBlobAsUrl from './useBlobAsUrl';

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
	extraSideActions?: React.ReactNode;
}>;

export default function ImageViewer({
	blob,
	fileName,
	width,
	height,

	withActions = false,
	downloadButtonText,
	extraSideActions,
}: Props) {
	const settings = useDataStore((state) => state.imageViewerSettings);

	const blobUrl = useBlobAsUrl(blob);

	return (
		<>
			{withActions ? (
				<ImageViewerActions
					blob={blob}
					blobUrl={blobUrl}
					downloadButtonText={downloadButtonText}
					extraSideActions={extraSideActions}
					fileName={fileName}
				/>
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
