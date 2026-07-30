import {Alert} from '@mantine/core';

export default function OldBrowserAlert() {
	// https://developer.mozilla.org/en-US/docs/Web/API/Response/bytes
	if ('bytes' in Response.prototype) {
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
