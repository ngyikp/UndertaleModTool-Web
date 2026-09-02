import {Tooltip} from '@mantine/core';
import {Link} from '@tanstack/react-router';

import renderSearchHighlight from '../common/renderSearchHighlight';
import {useSpritesDataStore} from '../stores/sprites-data-store';

import SpriteSidebarItemThumbnailImage from './SpriteSidebarItemThumbnailImage';
import styles from './SpriteSidebarItemThumbnailLink.module.css';

type Props = Readonly<{
	text: string;
	searchHighlight: string | null;
}>;

export default function SpriteSidebarItemThumbnailLink({
	text,
	searchHighlight,
}: Props) {
	const thumbnailSize = useSpritesDataStore((state) => state.thumbnailSize);

	return (
		<Tooltip label={text}>
			<Link
				to="/sprites/$name"
				params={{name: text}}
				preload="intent"
				preloadDelay={250}
				activeProps={{style: {fontWeight: 'bold'}}}
				resetScroll={false}
				className={styles.link}
			>
				<SpriteSidebarItemThumbnailImage
					imageClassName={styles.image}
					spriteName={text}
					wrapClassName={styles.imageWrap}
				/>

				{thumbnailSize > 50 ? (
					<span className={styles.text ?? ''}>
						{renderSearchHighlight({text, searchHighlight})}
					</span>
				) : null}
			</Link>
		</Tooltip>
	);
}
