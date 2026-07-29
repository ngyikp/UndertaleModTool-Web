import {Group, Select} from '@mantine/core';

import {useDataStore} from '../../data-store';

import styles from './ImageAppearanceSelect.module.css';

export default function ImageAppearanceSelect() {
	const settings = useDataStore((state) => state.imageViewerSettings);
	const setSettings = useDataStore((state) => state.setImageViewerSettings);

	return (
		<Group gap="xs">
			Appearance:
			<Select
				data={[
					{value: 'BLACK', label: 'Black'},
					{value: 'WHITE', label: 'White'},
					{value: 'CHECKERBOARD', label: 'Checkerboard'},
				]}
				value={settings.appearance}
				onChange={(value) => {
					setSettings({
						...settings,
						appearance: value ?? 'CHECKERBOARD',
					});
				}}
				className={styles.select}
				allowDeselect={false}
			/>
		</Group>
	);
}
