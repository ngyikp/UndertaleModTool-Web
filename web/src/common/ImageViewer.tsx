import {Button, Group, Select} from '@mantine/core';

import {useDataStore} from '../data-store';

import type {Appearance} from './image/ImageAppearanceType';
import ImageWithPlaceholder from './image/ImageWithPlaceholder';
import {useBlobAsUrl} from './image/useBlobAsUrl';
import styles from './ImageViewer.module.css';

export type ImageViewerSettings = {
	appearance: Appearance;
};

type Props = Readonly<{
	blob: Blob | null;
	fileName: string;
	width: number;
	height: number;
	enableDownload: boolean; // todo rethink this, maybe just rename the button text
}>;

export default function ImageViewer({
	blob,
	fileName,
	width,
	height,
	enableDownload,
}: Props) {
	const settings = useDataStore((state) => state.imageViewerSettings);
	const setSettings = useDataStore((state) => state.setImageViewerSettings);

	const blobUrl = useBlobAsUrl(blob);

	return (
		<>
			<Group gap="xs">
				Appearance:
				<Select
					data={[
						{value: 'BLACK', label: 'Black'},
						{value: 'WHITE', label: 'White'},
						{value: 'CHECKERBOARD', label: 'Checkerboard'},
					]}
					value={settings.appearance}
					onChange={(value) => {
						setSettings({
							...settings,
							appearance: value ?? 'CHECKERBOARD',
						});
					}}
					className={styles.appearanceSelect}
				/>
				{enableDownload ? (
					<Button
						component="a"
						href={blobUrl != null ? blobUrl : undefined}
						download={fileName}
						disabled={blobUrl == null}
						ml="auto"
					>
						Export raw image
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
