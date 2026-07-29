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
	editorRef?: React.RefObject<monaco.editor.IStandaloneCodeEditor | null>;
	onValueChange?: (value: string) => void;
}>;

export default function MonacoEditor({
	defaultValue,
	editorRef: parentEditorRef,
	onValueChange,
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
		});
	}, [colorScheme]);

	const previousValue = usePrevious(defaultValue);
	useEffect(() => {
		if (previousValue !== defaultValue) {
			editorRef.current?.getModel()?.setValue(defaultValue);
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

	useWindowEvent(
		'resize',
		useThrottledCallback(() => {
			editorRef.current?.layout();
		}, 100),
	);

	return <div className={styles.editor} ref={divRef} />;
}
