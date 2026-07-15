import {
	CodeHighlight,
	CodeHighlightAdapterProvider,
	createHighlightJsAdapter,
} from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import hljs from 'highlight.js/lib/core';
import gmlLang from 'highlight.js/lib/languages/gml';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('gml', gmlLang);

const highlightJsAdapter = createHighlightJsAdapter(hljs);

type Props = Readonly<{
	code: string;
}>;

export default function GmlCodeHighlighter({code}: Props) {
	return (
		<CodeHighlightAdapterProvider adapter={highlightJsAdapter}>
			<CodeHighlight code={code} language="gml" withLineNumbers />
		</CodeHighlightAdapterProvider>
	);
}
