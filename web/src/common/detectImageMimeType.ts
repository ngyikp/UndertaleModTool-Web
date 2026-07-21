export default function detectImageMimeType(buf: Uint8Array) {
	if (buf[0] === 137 && buf[1] === 80 && buf[2] === 78 && buf[3] === 71) {
		return 'image/png';
	}

	return null;
}
