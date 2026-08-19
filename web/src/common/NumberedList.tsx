import styles from './NumberedList.module.css';

// Workaround missing number list items on Safari
// https://github.com/ngyikp/UndertaleModTool-Web/issues/1
const MISSING_NUMBERS =
	navigator.userAgent.includes('Safari/') &&
	!navigator.userAgent.includes('Chrome/');

export function NumberedList({children}: {children: React.ReactNode}) {
	return (
		<ol className={!MISSING_NUMBERS ? styles.list : styles.fakeNumberedList}>
			{children}
		</ol>
	);
}

export function NumberedListItem({
	children,
	index,
}: {
	children: React.ReactNode;
	index: number;
}) {
	return !MISSING_NUMBERS ? (
		<li className={styles.listItem}>{children}</li>
	) : (
		<li className={styles.fakeNumberedListItem}>
			<div className={styles.fakeNumber}>{index + 1}.&nbsp;</div>
			<div>{children}</div>
		</li>
	);
}

export default {NumberedList, NumberedListItem};
