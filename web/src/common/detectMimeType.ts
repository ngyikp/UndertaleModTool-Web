export type MimeType =
	| 'image/png'
	| 'application/x-bzip2'
	| 'image/qoi'
	| 'image/x-dds'
	| 'audio/wav'
	| 'audio/ogg';

export default function detectMimeType(buf: Uint8Array): MimeType | null {
	// Image
	if (
		buf[0] === 137 &&
		buf[1] === 80 &&
		buf[2] === 78 &&
		buf[3] === 71 &&
		buf[4] === 13 &&
		buf[5] === 10 &&
		buf[6] === 26 &&
		buf[7] === 10
	) {
		return 'image/png';
	}

	if (buf[0] === 66 && buf[1] === 90 && buf[2] === 104) {
		return 'application/x-bzip2';
	}

	if (buf[0] === 113 && buf[1] === 111 && buf[2] === 105 && buf[3] === 102) {
		return 'image/qoi';
	}

	if (buf[0] === 68 && buf[1] === 68 && buf[2] === 83 && buf[3] === 32) {
		return 'image/x-dds';
	}

	// Audio
	if (buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70) {
		return 'audio/wav';
	}

	if (buf[0] === 79 && buf[1] === 103 && buf[2] === 103 && buf[3] === 83) {
		return 'audio/ogg';
	}

	return null;
}
