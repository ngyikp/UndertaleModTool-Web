import {Button} from '@mantine/core';
import {useEffect, useRef, useState} from 'react';

import styles from './CustomCopyButton.module.css';

type Props = Readonly<{
	label: string;
	value: string | Blob | null;
}>;

// Mantine's useClipboard hook doesn't support images
export default function CustomCopyButton({label, value}: Props) {
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [loaderText, setLoaderText] = useState('');

	const timeoutRef = useRef<number | null>(null);

	async function copy() {
		if (value == null) {
			return;
		}

		setCopied(false);
		setError(null);

		try {
			if (typeof value === 'string') {
				await navigator.clipboard.writeText(value);
			} else {
				await navigator.clipboard.write([
					new ClipboardItem({[value.type]: value}),
				]);
			}

			setLoaderText('Copied');
			setCopied(true);
		} catch (error) {
			console.error(error);

			setLoaderText('Error');
			setError(error instanceof Error ? error : new Error('Copying failed'));
		}

		if (timeoutRef.current) {
			window.clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = window.setTimeout(() => {
			setCopied(false);
			setError(null);
		}, 1000);
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	if (!('clipboard' in navigator)) {
		// Clipboard API only available in secure contexts
		return null;
	}

	return (
		<Button
			color={copied ? 'teal' : undefined}
			variant={copied ? undefined : 'default'}
			disabled={value == null}
			loading={copied || error != null}
			loaderProps={{
				children: loaderText,
			}}
			classNames={{root: styles.root}}
			onClick={() => {
				void copy();
			}}
		>
			{label}
		</Button>
	);
}
