import {Collapse} from '@mantine/core';
import {useState} from 'react';

import styles from './CollapsibleListBox.module.css';

function List({items, start}: {items: React.ReactNode[]; start?: number}) {
	return (
		<ol className={styles.list} start={start}>
			{items.map((item, index) => {
				return (
					// Items are not guaranteed to be unique
					// eslint-disable-next-line @eslint-react/no-array-index-key
					<li key={index} className={styles.listItem}>
						{item}
					</li>
				);
			})}
		</ol>
	);
}

type Props = Readonly<{
	items: React.ReactNode[];
	defaultShownCount?: number;
}>;

export default function CollapsibleListBox({
	items,
	defaultShownCount = 3,
}: Props) {
	const [viewAll, setViewAll] = useState(false);

	const hasMoreItems = items.length > defaultShownCount;

	return (
		<>
			<List items={hasMoreItems ? items.slice(0, defaultShownCount) : items} />

			{hasMoreItems ? (
				<Collapse expanded={viewAll}>
					<List
						items={items.slice(defaultShownCount)}
						start={defaultShownCount + 1}
					/>
				</Collapse>
			) : null}

			{!viewAll && hasMoreItems ? (
				<a
					href="#"
					onClick={(ev) => {
						ev.preventDefault();
						setViewAll(true);
					}}
				>
					Show all
				</a>
			) : null}
		</>
	);
}
