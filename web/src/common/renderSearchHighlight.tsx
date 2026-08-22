import {Highlight} from '@mantine/core';

// todo doesn't work with auto-replacing spaces with underscores done in SortableList
export default function renderSearchHighlight({
	text,
	searchHighlight,
}: {
	text: string;
	searchHighlight: string | null;
}): React.ReactNode {
	return searchHighlight === null ? (
		text
	) : (
		<Highlight
			highlight={searchHighlight}
			accentInsensitive={false}
			span
			inherit
		>
			{text}
		</Highlight>
	);
}
