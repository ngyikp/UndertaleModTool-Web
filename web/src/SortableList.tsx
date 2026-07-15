import {
	Button,
	Group,
	Input,
	List,
	Select,
	Stack,
	TextInput,
} from '@mantine/core';

import {useDataStore} from './data-store';
import styles from './SortableList.module.css';

export type SortableListSettings = {
	filter: string;
	orderBy: 'DEFAULT' | 'A_TO_Z' | 'Z_TO_A';
};

type Props = Readonly<{
	id: string; // used to uniquely identify lists on different pages to restore state
	list: string[] | undefined | null;
	render: (item: string) => React.ReactNode;
}>;

export default function SortableList({id, list, render}: Props) {
	const settings = useDataStore((state) =>
		state.sortableListSettings.get(id),
	) ?? {
		filter: '',
		orderBy: 'DEFAULT',
	};
	const setSettings = useDataStore((state) => state.setSortableListSettings);

	function setFilter(filter: string) {
		setSettings(id, {
			...settings,
			filter,
		});
	}

	if (list == null || list.length === 0) {
		return null;
	}

	let sortedList = list;
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

	return (
		<Stack>
			<Group gap="xs" className={styles.sticky} pt="md">
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

			{sortedList.length > 0 ? (
				<List>
					{sortedList.map((item) => {
						return <List.Item key={item}>{render(item)}</List.Item>;
					})}
				</List>
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
				'This list is empty.'
			)}
		</Stack>
	);
}
