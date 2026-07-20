import {
	Button,
	Group,
	Input,
	Pagination,
	Select,
	Stack,
	TextInput,
	Tooltip,
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
	// Used to uniquely identify lists on different pages to restore state
	id: string;
	emptyListMessage?: React.ReactNode;
	// Some lists (e.g. variables) have non-unique items, we can't use them for unique keys
	// so fall back to array index (very inefficient)
	itemsAreNonUnique?: boolean;
	list: string[];
	onIndexPage: boolean;
	render: (item: string) => React.ReactNode;
}>;

export default function SortableList({
	id,
	emptyListMessage = DEFAULT_EMPTY_LIST_MESSAGE,
	itemsAreNonUnique = false,
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

	let filteredList = allResultsList;
	if (settings.filter) {
		const filterCompare = settings.filter
			.trim()
			.replace(/ /g, '_')
			.toLowerCase();

		filteredList = filteredList.filter((item) => {
			return item.toLowerCase().includes(filterCompare);
		});
	}
	if (settings.orderBy !== 'DEFAULT') {
		filteredList = filteredList.concat().sort((a, b) => {
			if (a < b) {
				return settings.orderBy === 'A_TO_Z' ? -1 : 1;
			} else if (a > b) {
				return settings.orderBy === 'A_TO_Z' ? 1 : -1;
			}

			return 0;
		});
	}

	const hasPages = filteredList.length > PAGE_SIZE;
	const startIndex = PAGE_SIZE * (settings.page - 1);
	const onePageList = hasPages
		? filteredList.slice(startIndex, startIndex + PAGE_SIZE)
		: filteredList;

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
								<Tooltip label="Clear">
									<Input.ClearButton
										onClick={() => {
											setFilter('');
										}}
									/>
								</Tooltip>
							) : undefined
						}
						rightSectionPointerEvents="auto"
						flex={1}
					/>
				</Group>
			) : null}

			{onePageList.length > 0 ? (
				<>
					<p>
						{hasPages
							? (startIndex + 1).toString() +
								'-' +
								(startIndex + onePageList.length).toString() +
								' of '
							: ''}
						{filteredList.length} items
					</p>

					<ul className={styles.list}>
						{onePageList.map((item, index) => {
							return (
								// eslint-disable-next-line @eslint-react/no-array-index-key
								<li key={!itemsAreNonUnique ? item : index}>{render(item)}</li>
							);
						})}
					</ul>

					{hasPages ? (
						<Pagination
							total={Math.ceil(filteredList.length / PAGE_SIZE)}
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
