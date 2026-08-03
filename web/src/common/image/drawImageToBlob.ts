import detectMimeType from '../detectMimeType';

import drawBgraToCanvas from './drawBgraToCanvas';

// Handles PNG data sent into `fileContents`, or bgra
export default async function drawImageToBlob(
	fileContents: Uint8Array<ArrayBuffer> | null,
	bgra: Uint8Array<ArrayBuffer> | null,
	width: number,
	height: number,
): Promise<Blob> {
	if (fileContents != null) {
		return new Blob([fileContents], {
			type: detectMimeType(fileContents) ?? 'application/octet-stream',
		});
	}

	if (bgra != null) {
		return drawBgraToCanvas(bgra, width, height).convertToBlob();
	}

	throw new Error('Either file contents or bgra should be provided.');
}
