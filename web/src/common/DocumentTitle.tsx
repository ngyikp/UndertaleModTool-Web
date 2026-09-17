import {useQuery} from '@tanstack/react-query';

import {getDataFileLoadInfoQueryOptions} from '../messages/getDataFileLoadInfo';

type Props = Readonly<{
	text: string | string[];
}>;

export default function DocumentTitle({text}: Props) {
	const {data: dataFileLoadInfo} = useQuery(getDataFileLoadInfoQueryOptions());

	const segments = typeof text === 'string' ? [text] : [...text];
	if (dataFileLoadInfo) {
		segments.push(dataFileLoadInfo.DisplayTitle);
	}
	segments.push(
		(import.meta.env.DEV ? '(DEV) ' : '') + 'UndertaleModTool on the Web',
	);

	return <title>{segments.filter(Boolean).join(' - ')}</title>;
}
