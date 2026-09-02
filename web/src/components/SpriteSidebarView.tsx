import {ActionIcon, Group, Slider, Tooltip, Transition} from '@mantine/core';
import {ImageSquareIcon} from '@phosphor-icons/react/dist/csr/ImageSquare';
import {ListBulletsIcon} from '@phosphor-icons/react/dist/csr/ListBullets';

import {useSpritesDataStore} from '../stores/sprites-data-store';

import styles from './SpriteSidebarView.module.css';

export default function SpriteSidebarView() {
	const viewMode = useSpritesDataStore((state) => state.viewMode);
	const setViewMode = useSpritesDataStore((state) => state.setViewMode);

	const thumbnailSize = useSpritesDataStore((state) => state.thumbnailSize);
	const setThumbnailSize = useSpritesDataStore(
		(state) => state.setThumbnailSize,
	);

	return (
		<Group mb="xs">
			<Group gap="xs">
				View:
				<ActionIcon.Group>
					<Tooltip
						label="View as list"
						events={{hover: true, focus: true, touch: true}}
					>
						<ActionIcon
							aria-label="View as list"
							onClick={() => {
								setViewMode('LIST');
							}}
							variant={viewMode === 'LIST' ? 'filled' : 'default'}
							size="lg"
						>
							<ListBulletsIcon size={16} />
						</ActionIcon>
					</Tooltip>

					<Tooltip
						label="View as thumbnails"
						events={{hover: true, focus: true, touch: true}}
					>
						<ActionIcon
							aria-label="View as thumbnails"
							onClick={() => {
								setViewMode('THUMBNAIL');
							}}
							variant={viewMode === 'THUMBNAIL' ? 'filled' : 'default'}
							size="lg"
						>
							<ImageSquareIcon size={16} />
						</ActionIcon>
					</Tooltip>
				</ActionIcon.Group>
			</Group>

			<Transition
				duration={150}
				mounted={viewMode === 'THUMBNAIL'}
				transition="fade"
			>
				{(transitionStyles) => (
					<Group gap="xs" style={transitionStyles}>
						Size:
						<Slider
							className={styles.viewSizeSlider}
							onChange={setThumbnailSize}
							min={50} // limit to prevent excessive browser lag
							max={300}
							value={thumbnailSize}
						/>
					</Group>
				)}
			</Transition>
		</Group>
	);
}
