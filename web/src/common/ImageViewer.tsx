import {Button} from '@mantine/core';
import {useEffect, useMemo, useState} from 'react';

function getMimeType(buf: Uint8Array) {
	if (buf[0] === 137 && buf[1] === 80 && buf[2] === 78 && buf[3] === 71) {
		return 'image/png';
	}

	return null;
}

type Props = Readonly<{
	fileContents: Uint8Array<ArrayBuffer>;
	fileName: string;
}>;

export default function ImageViewer({fileContents, fileName}: Props) {
	const [blobUrl, setBlobUrl] = useState<string | null>(null);

	const mimeType = useMemo(() => {
		return getMimeType(fileContents);
	}, [fileContents]);

	useEffect(() => {
		if (fileContents.length <= 0) {
			return;
		}

		const blob = new Blob([fileContents], {
			type: mimeType ?? 'application/octet-stream',
		});
		const url = window.URL.createObjectURL(blob);
		// eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect
		setBlobUrl(url);

		return () => {
			setBlobUrl(null);
			window.URL.revokeObjectURL(url);
		};
	}, [fileContents, mimeType]);

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
						className="checkerboard"
						style={{display: 'block'}}
					/>
				</div>
			) : null}
		</>
	);
}
