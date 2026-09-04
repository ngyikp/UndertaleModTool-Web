import {Loader, Tooltip} from '@mantine/core';
import {useIntersection} from '@mantine/hooks';
import {Link} from '@tanstack/react-router';
import {Suspense} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
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

	const {ref, entry} = useIntersection();

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
				<div className={styles.imageWrap} ref={ref}>
					{entry?.isIntersecting ? (
						<ErrorBoundary fallback={null}>
							<Suspense fallback={<Loader color="blue" size="xs" />}>
								<SpriteSidebarItemThumbnailImage
									imageClassName={styles.image}
									spriteName={text}
								/>
							</Suspense>
						</ErrorBoundary>
					) : null}
				</div>

				{thumbnailSize > 50 ? (
					<span className={styles.text ?? ''}>
						{renderSearchHighlight({text, searchHighlight})}
					</span>
				) : null}
			</Link>
		</Tooltip>
	);
}
