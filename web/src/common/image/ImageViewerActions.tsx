import {Button, Flex, Group} from '@mantine/core';

import CustomCopyButton from '../CustomCopyButton';

import ImageAppearanceSelect from './ImageAppearanceSelect';

type Props = Readonly<{
	blob: Blob | null;
	blobUrl: string | null;
	fileName?: string;

	downloadButtonText?: string;
}>;

export default function ImageViewerActions({
	blob,
	blobUrl,
	fileName,
	downloadButtonText = 'Export image',
}: Props) {
	return (
		<Group>
			<Flex mr="auto">
				<ImageAppearanceSelect />
			</Flex>

			<Button.Group>
				<Button
					component="a"
					href={blobUrl != null ? blobUrl : undefined}
					download={fileName}
					disabled={blobUrl == null}
					variant="default"
				>
					{downloadButtonText}
				</Button>

				<CustomCopyButton label="Copy image" value={blob} />
			</Button.Group>
		</Group>
	);
}
