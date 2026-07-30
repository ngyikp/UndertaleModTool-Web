import {Alert} from '@mantine/core';

export default function OldBrowserAlert() {
	// https://developer.mozilla.org/en-US/docs/Web/API/Blob/bytes
	if ('bytes' in Blob.prototype) {
		return;
	}

	return (
		<Alert
			variant="light"
			color="yellow"
			title="Your browser version is outdated and may not work properly in this app, please update your browser."
			mb="md"
		/>
	);
}
