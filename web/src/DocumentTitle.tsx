import {useDataStore} from './data-store';

type Props = Readonly<{
	text: string | string[];
}>;

export default function DocumentTitle({text}: Props) {
	const info = useDataStore((state) => state.gameInfo);

	const segments = typeof text === 'string' ? [text] : [...text];
	if (info && info.ProjectName != null) {
		segments.push(info.ProjectName);
	}
	segments.push('UndertaleModTool on the Web');

	return <title>{segments.filter(Boolean).join(' - ')}</title>;
}
