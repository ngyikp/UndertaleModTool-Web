import {useEffect, useState} from 'react';

export function useBlobAsUrl(blob: Blob | null): string | null {
	const [blobUrl, setBlobUrl] = useState<string | null>(null);

	useEffect(() => {
		const url = blob != null ? window.URL.createObjectURL(blob) : null;
		if (url) {
			// eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect
			setBlobUrl(url);
		}

		return () => {
			setBlobUrl(null);

			if (url) {
				window.URL.revokeObjectURL(url);
			}
		};
	}, [blob]);

	return blobUrl;
}
