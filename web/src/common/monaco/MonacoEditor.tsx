import {useColorScheme, usePrevious} from '@mantine/hooks';
import * as monaco from 'monaco-editor/editor/editor.api';
import {useEffect, useRef} from 'react';

import styles from './MonacoEditor.module.css';
import './setupMonaco';

type Props = Readonly<{
	defaultValue: string;
	editorRef?: React.RefObject<monaco.editor.IStandaloneCodeEditor | null>;
	onValueChange?: (value: string) => void;
	wordWrap: boolean;
}>;

export default function MonacoEditor({
	defaultValue,
	editorRef: parentEditorRef,
	onValueChange,
	wordWrap,
}: Props) {
	const colorScheme = useColorScheme();

	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
	const divRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!divRef.current) {
			return;
		}

		if (!editorRef.current) {
			editorRef.current = monaco.editor.create(divRef.current, {
				language: 'gml',
				automaticLayout: true,
				// scrollbar: {
				// 	alwaysConsumeMouseWheel: false,
				// },
				scrollBeyondLastLine: false,
				stickyScroll: {
					enabled: false,
				},
			});
		}

		if (parentEditorRef) {
			parentEditorRef.current = editorRef.current;
		}

		return () => {
			editorRef.current?.dispose();
			editorRef.current = null;
		};
	}, [parentEditorRef]);

	useEffect(() => {
		editorRef.current?.updateOptions({
			theme: colorScheme === 'dark' ? 'vs-dark' : 'vs',
			wordWrap: wordWrap ? 'on' : 'off',
		});
	}, [colorScheme, wordWrap]);

	const previousValue = usePrevious(defaultValue);
	useEffect(() => {
		if (previousValue === defaultValue) {
			return;
		}

		const editorModel = editorRef.current?.getModel();
		if (editorModel && editorModel.getValue() !== defaultValue) {
			editorModel.setValue(defaultValue);
		}
	}, [defaultValue, previousValue]);

	useEffect(() => {
		const event = editorRef.current?.onDidChangeModelContent(() => {
			if (editorRef.current) {
				onValueChange?.(editorRef.current.getValue());
			}
		});

		return () => {
			event?.dispose();
		};
	}, [onValueChange]);

	return <div className={styles.editor} ref={divRef} />;
}
