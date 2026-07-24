import {
	useColorScheme,
	usePrevious,
	useThrottledCallback,
	useWindowEvent,
} from '@mantine/hooks';
import * as monaco from 'monaco-editor/editor/editor.api';
import {useEffect, useRef} from 'react';

import styles from './MonacoEditor.module.css';
import './setupMonaco';

type Props = Readonly<{
	defaultValue: string;
}>;

export default function MonacoEditor({defaultValue}: Props) {
	const colorScheme = useColorScheme();
	const previousValue = usePrevious(defaultValue);

	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
	const divRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!divRef.current) {
			return;
		}

		if (!editorRef.current) {
			editorRef.current = monaco.editor.create(divRef.current, {
				value: defaultValue,
				theme: colorScheme === 'dark' ? 'vs-dark' : 'vs',
				language: 'gml',
			});
		}

		return () => {
			editorRef.current?.dispose();
			editorRef.current = null;
		};
	}, [colorScheme, defaultValue]);

	useEffect(() => {
		editorRef.current?.updateOptions({
			theme: colorScheme === 'dark' ? 'vs-dark' : 'vs',
		});
	}, [colorScheme]);

	useEffect(() => {
		if (previousValue !== defaultValue) {
			editorRef.current?.getModel()?.setValue(defaultValue);
		}
	}, [defaultValue, previousValue]);

	useWindowEvent(
		'resize',
		useThrottledCallback(() => {
			console.log('run');
			editorRef.current?.layout();
		}, 100),
	);

	return <div className={styles.editor} ref={divRef} />;
}
