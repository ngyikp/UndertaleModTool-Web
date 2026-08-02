import {Alert} from '@mantine/core';

export default function OldBrowserAlert() {
	// https://developer.mozilla.org/en-US/docs/Web/API/Blob/bytes
	if (!('bytes' in Blob.prototype)) {
		return (
			<Alert
				variant="light"
				color="yellow"
				title="Your browser version is outdated and may not work properly in this app, please update your browser."
				mb="md"
			/>
		);
	}

	// Firefox allows disabling WebAssembly through `about:config`
	if (typeof window.WebAssembly === 'undefined') {
		return (
			<Alert
				variant="light"
				color="red"
				title="This app requires WebAssembly but it is unavailable in your browser. Please try updating your browser and check your privacy extensions/settings."
				mb="md"
			/>
		);
	}

	return null;
}
