export default function drawBgraToCanvas(
	bgra: Uint8Array<ArrayBuffer>,
	width: number,
	height: number,
): OffscreenCanvas {
	const canvas = new OffscreenCanvas(width, height);

	const ctx = canvas.getContext('2d', {alpha: true});
	if (!ctx) {
		throw new Error('Canvas rendering context is missing');
	}
	const imageData = ctx.createImageData(width, height);

	for (let i = 0; i < bgra.length; i += 4) {
		const r = bgra[i + 2];
		const g = bgra[i + 1];
		const b = bgra[i + 0];
		const a = bgra[i + 3];
		if (r == null || g == null || b == null || a == null) {
			throw new Error('Missing pixel in bgra');
		}

		imageData.data[i] = r;
		imageData.data[i + 1] = g;
		imageData.data[i + 2] = b;
		imageData.data[i + 3] = a;
	}

	ctx.putImageData(imageData, 0, 0);

	return canvas;
}
