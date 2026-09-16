import {useQuery} from '@tanstack/react-query';

import {getGameInfoQueryOptions} from '../messages/getGameInfo';

import getGameDisplayName from './getGameDisplayName';

type Props = Readonly<{
	text: string | string[];
}>;

export default function DocumentTitle({text}: Props) {
	const {data: gameInfo} = useQuery(getGameInfoQueryOptions());

	const segments = typeof text === 'string' ? [text] : [...text];
	if (gameInfo) {
		segments.push(getGameDisplayName(gameInfo));
	}
	segments.push(
		(import.meta.env.DEV ? '(DEV) ' : '') + 'UndertaleModTool on the Web',
	);

	return <title>{segments.filter(Boolean).join(' - ')}</title>;
}
