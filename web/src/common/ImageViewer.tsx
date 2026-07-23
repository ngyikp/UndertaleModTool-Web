import {Button} from '@mantine/core';
import {useEffect, useState} from 'react';

import styles from './ImageViewer.module.css';

type Props = Readonly<{
	blob: Blob;
	fileName: string;
	mimeType: string | null;
}>;

export default function ImageViewer({blob, fileName, mimeType}: Props) {
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
			{blobUrl ? (
				<div>
					<Button component="a" href={blobUrl} download={fileName}>
						Export raw image
					</Button>
				</div>
			) : null}

			{blobUrl && mimeType === 'image/png' ? (
				<div style={{overflowX: 'auto'}}>
					<img
						src={blobUrl}
						alt={fileName}
						className={styles.checkerboard}
						style={{display: 'block'}}
					/>
				</div>
			) : null}
		</>
	);
}
