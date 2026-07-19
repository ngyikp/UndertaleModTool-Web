import {
	Button,
	Group,
	Input,
	Pagination,
	Select,
	Stack,
	TextInput,
} from '@mantine/core';

import {useDataStore} from '../data-store';

import styles from './SortableList.module.css';

export type SortableListSettings = {
	filter: string;
	orderBy: 'DEFAULT' | 'A_TO_Z' | 'Z_TO_A';
	page: number;
};

const PAGE_SIZE = 2000;
const DEFAULT_EMPTY_LIST_MESSAGE = <p>This list is empty.</p>;

type Props = Readonly<{
	id: string; // used to uniquely identify lists on different pages to restore state
	emptyListMessage?: React.ReactNode;
	list: string[];
	onIndexPage: boolean;
	render: (item: string) => React.ReactNode;
}>;

export default function SortableList({
	id,
	emptyListMessage = DEFAULT_EMPTY_LIST_MESSAGE,
	list: allResultsList,
	onIndexPage,
	render,
}: Props) {
	const settings = useDataStore((state) =>
		state.sortableListSettings.get(id),
	) ?? {
		filter: '',
		orderBy: 'DEFAULT',
		page: 1,
	};
	const setSettings = useDataStore((state) => state.setSortableListSettings);

	function setFilter(filter: string) {
		setSettings(id, {
			...settings,
			filter,
			page: 1,
		});
	}

	let sortedList = allResultsList;
	if (settings.filter) {
		const filterCompare = settings.filter
			.trim()
			.replace(/ /g, '_')
			.toLowerCase();

		sortedList = sortedList.filter((item) => {
			return item.toLowerCase().includes(filterCompare);
		});
	}
	if (settings.orderBy !== 'DEFAULT') {
		sortedList = sortedList.concat().sort((a, b) => {
			if (a < b) {
				return settings.orderBy === 'A_TO_Z' ? -1 : 1;
			} else if (a > b) {
				return settings.orderBy === 'A_TO_Z' ? 1 : -1;
			}

			return 0;
		});
	}

	const hasPages = allResultsList.length > PAGE_SIZE;
	if (hasPages) {
		const start = PAGE_SIZE * (settings.page - 1);
		sortedList = sortedList.slice(start, start + PAGE_SIZE);
	}

	return (
		<Stack>
			{allResultsList.length > 0 ? (
				<Group
					gap="xs"
					className={[
						styles.filters,
						!onIndexPage ? styles.filtersNotOnIndexPage : '',
					].join(' ')}
				>
					Sort by:
					<Select
						data={[
							{value: 'DEFAULT', label: 'Default'},
							{value: 'A_TO_Z', label: 'A-Z'},
							{value: 'Z_TO_A', label: 'Z-A'},
						]}
						value={settings.orderBy}
						onChange={(value) => {
							setSettings(id, {
								...settings,
								orderBy: value ?? 'DEFAULT',
							});
						}}
						style={{width: '7rem'}}
					/>
					<TextInput
						value={settings.filter}
						placeholder="Find"
						onChange={(event) => {
							setFilter(event.currentTarget.value);
						}}
						rightSection={
							settings.filter !== '' ? (
								<Input.ClearButton
									title="Clear"
									onClick={() => {
										setFilter('');
									}}
								/>
							) : undefined
						}
						rightSectionPointerEvents="auto"
						flex={1}
					/>
				</Group>
			) : null}

			{sortedList.length > 0 ? (
				<>
					<ul className={styles.list}>
						{sortedList.map((item) => {
							return <li key={item}>{render(item)}</li>;
						})}
					</ul>

					{hasPages ? (
						<Pagination
							total={Math.ceil(allResultsList.length / PAGE_SIZE)}
							value={settings.page}
							onChange={(newPage) => {
								setSettings(id, {
									...settings,
									page: newPage,
								});
							}}
							layout="responsive"
						/>
					) : null}
				</>
			) : settings.filter ? (
				<>
					No results for "{settings.filter}".
					<div>
						<Button
							onClick={() => {
								setFilter('');
							}}
						>
							Show all results
						</Button>
					</div>
				</>
			) : (
				emptyListMessage
			)}
		</Stack>
	);
}
