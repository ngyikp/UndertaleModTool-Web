import {
	Button,
	Group,
	Input,
	Pagination,
	Select,
	Stack,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import {MagnifyingGlassIcon} from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import {useRef} from 'react';

import {useDataStore} from '../data-store';

import renderSearchHighlight from './renderSearchHighlight';
import styles from './SortableList.module.css';

export type SortableListSettings = {
	filter: string;
	orderBy: 'DEFAULT' | 'A_TO_Z' | 'Z_TO_A';
	page: number;
};

const PAGE_SIZE = 2000;
const DEFAULT_EMPTY_LIST_MESSAGE = <p>This list is empty.</p>;
const DEFAULT_GET_NAME_FROM_LIST = (item: unknown) => {
	if (typeof item === 'string') {
		return item;
	}

	throw new Error(
		'Unexpected item type for SortableList, ensure getNameFromList() is implemented',
	);
};

type GetNameFromListProp<T> = Readonly<{
	getNameFromList: (item: T) => string;
}>;

type Props<T> = Readonly<{
	// Used to uniquely identify lists on different pages to restore state
	id: string;
	emptyListMessage?: React.ReactNode;
	extraBelowItemCounts?: React.ReactNode;
	// Some lists (e.g. variables) have non-unique items, we can't use them for unique keys
	// so fall back to array index (very inefficient)
	itemsAreNonUnique?: boolean;
	list: T[];
	onIndexPage: boolean;
	render?: (options: {
		text: string;
		item: T;
		searchHighlight: string | null;
	}) => React.ReactNode;
}> &
	(T extends string ? Partial<GetNameFromListProp<T>> : GetNameFromListProp<T>);

export default function SortableList<T>({
	id,
	emptyListMessage = DEFAULT_EMPTY_LIST_MESSAGE,
	extraBelowItemCounts,
	getNameFromList = DEFAULT_GET_NAME_FROM_LIST,
	itemsAreNonUnique = false,
	list: allResultsList,
	onIndexPage,
	render = renderSearchHighlight,
}: Props<T>) {
	const settings = useDataStore((state) =>
		state.sortableListSettings.get(id),
	) ?? {
		filter: '',
		orderBy: 'DEFAULT',
		page: 1,
	};
	const setSettings = useDataStore((state) => state.setSortableListSettings);

	const wrapRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	function setFilter(filter: string) {
		setSettings(id, {
			...settings,
			filter,
			page: 1,
		});
	}

	function scrollListToTop() {
		if (onIndexPage) {
			if (wrapRef.current) {
				wrapRef.current.scrollIntoView();
			} else {
				window.scrollTo(0, 0);
			}
		} else {
			listRef.current?.scrollTo(0, 0);
		}
	}

	const searchHighlight = settings.filter.length >= 2 ? settings.filter : null;
	let filteredList = allResultsList;
	if (settings.filter) {
		const filterCompare = settings.filter
			.trim()
			.replace(/ /g, '_')
			.toLowerCase();

		filteredList = filteredList.filter((item) => {
			return getNameFromList(item).toLowerCase().includes(filterCompare);
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
		<div
			className={
				onIndexPage && allResultsList.length > 0
					? styles.wrapOnIndexPage
					: styles.wrapOnSide
			}
			ref={wrapRef}
		>
			{allResultsList.length > 0 ? (
				<Group gap="xs" py="md" className={styles.filters}>
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
						style={{width: '6.4rem'}}
						allowDeselect={false}
					/>
					<TextInput
						aria-label="Search"
						flex={1}
						leftSectionPointerEvents="none"
						leftSection={<MagnifyingGlassIcon size={16} />}
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
						onChange={(event) => {
							setFilter(event.currentTarget.value);
						}}
						placeholder="Search"
						spellCheck={false}
						value={settings.filter}
						type="search"
					/>
				</Group>
			) : null}

			{onePageList.length > 0 ? (
				<>
					<Text mb="xs" className={styles.itemCounts}>
						{hasPages
							? (startIndex + 1).toString() +
								'-' +
								(startIndex + onePageList.length).toString() +
								' of '
							: ''}
						{filteredList.length} {filteredList.length === 1 ? 'item' : 'items'}
					</Text>

					{extraBelowItemCounts != null ? (
						<div className={styles.extraBelowItemCounts}>
							{extraBelowItemCounts}
						</div>
					) : null}

					<ul className={styles.list} ref={listRef}>
						{onePageList.map((item, index) => {
							return (
								<li
									// className={styles.listItem}
									// eslint-disable-next-line @eslint-react/no-array-index-key
									key={!itemsAreNonUnique ? getNameFromList(item) : index}
								>
									{render({
										text: getNameFromList(item),
										item,
										searchHighlight,
									})}
								</li>
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

								scrollListToTop();
							}}
							layout="responsive"
							className={styles.pagination}
							py="md"
						/>
					) : null}
				</>
			) : settings.filter ? (
				<Stack>
					No results for “{settings.filter}”.
					<div>
						<Button
							onClick={() => {
								setFilter('');
							}}
						>
							Show all results
						</Button>
					</div>
				</Stack>
			) : (
				emptyListMessage
			)}
		</div>
	);
}
