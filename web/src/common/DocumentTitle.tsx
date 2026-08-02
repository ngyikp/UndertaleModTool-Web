import {useDataStore} from '../data-store';

import getGameDisplayName from './getGameDisplayName';

type Props = Readonly<{
	text: string | string[];
}>;

export default function DocumentTitle({text}: Props) {
	const info = useDataStore((state) => state.gameInfo);

	const segments = typeof text === 'string' ? [text] : [...text];
	if (info) {
		segments.push(getGameDisplayName(info));
	}
	segments.push(
		(import.meta.env.DEV ? '(DEV) ' : '') + 'UndertaleModTool on the Web',
	);

	return <title>{segments.filter(Boolean).join(' - ')}</title>;
}
