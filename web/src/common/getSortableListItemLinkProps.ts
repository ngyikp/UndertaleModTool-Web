import type {LinkProps} from '@tanstack/react-router';

import renderSearchHighlight from './renderSearchHighlight';

export default function getSortableListItemLinkProps(
	text: string,
	searchHighlight: string | null,
): LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> {
	return {
		preload: 'intent',
		preloadDelay: 250,
		activeProps: {style: {fontWeight: 'bold'}},
		resetScroll: false,
		title: text,

		children: renderSearchHighlight({text, searchHighlight}),
	};
}
