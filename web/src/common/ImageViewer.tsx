import {Button} from '@mantine/core';
import {useEffect, useState} from 'react';

import styles from './ImageViewer.module.css';

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
			{enableDownload && blobUrl ? (
				<div>
					<Button component="a" href={blobUrl} download={fileName}>
						Export raw image
					</Button>
				</div>
			) : null}

			{blobUrl ? (
				<div style={{overflowX: 'auto'}}>
					<img
						src={blobUrl}
						alt={fileName}
						className={styles.checkerboard}
						style={{display: 'block'}}
						width={width}
						height={height}
					/>
				</div>
			) : null}
		</>
	);
}
