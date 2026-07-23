import {Button, Group, Select} from '@mantine/core';
import {useEffect, useState} from 'react';

import {useDataStore} from '../data-store';

import styles from './ImageViewer.module.css';

type Appearance = 'BLACK' | 'WHITE' | 'CHECKERBOARD';

export type ImageViewerSettings = {
	appearance: Appearance;
};

type Props = Readonly<{
	blob: Blob;
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

	const [blobUrl, setBlobUrl] = useState<string | null>(null);

	useEffect(() => {
		const url = window.URL.createObjectURL(blob);
		// eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect
		setBlobUrl(url);

		return () => {
			setBlobUrl(null);
			window.URL.revokeObjectURL(url);
		};
	}, [blob]);

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
				{enableDownload && blobUrl ? (
					<Button component="a" href={blobUrl} download={fileName} ml="auto">
						Export raw image
					</Button>
				) : null}
			</Group>

			{blobUrl ? (
				<div className={styles.scrollable}>
					<img
						src={blobUrl}
						alt={fileName}
						className={[
							styles.image,
							settings.appearance === 'BLACK'
								? styles.black
								: settings.appearance === 'WHITE'
									? styles.white
									: styles.checkerboard,
						].join(' ')}
						width={width}
						height={height}
					/>
				</div>
			) : null}
		</>
	);
}
