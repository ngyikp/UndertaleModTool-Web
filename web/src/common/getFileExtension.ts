import type {MimeType} from './detectMimeType';

export default function getFileExtension(mimeType: MimeType): string | null {
	switch (mimeType) {
		case 'image/png':
			return '.png';

		case 'application/x-bzip2':
			return '.bz2';

		case 'image/qoi':
			return '.qoi';

		case 'image/x-dds':
			return '.dds';

		case 'audio/wav':
			return '.wav';

		case 'audio/ogg':
			return '.ogg';

		default:
			return null;
	}
}
