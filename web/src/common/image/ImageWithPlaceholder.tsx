import type {Appearance} from './ImageAppearanceType';
import styles from './ImageWithPlaceholder.module.css';

type Props = Readonly<{
	src: string | null;
	width: number;
	height: number;

	appearance?: Appearance;
	alt?: string;
}>;

// If the image's src is unavailable, then show a placeholder div with the
// same dimensions
export default function ImageWithPlaceholder({
	src,
	width,
	height,
	appearance,
	alt,
}: Props) {
	const imageClassName = [
		styles.image,
		appearance === 'BLACK'
			? styles.black
			: appearance === 'WHITE'
				? styles.white
				: appearance === 'CHECKERBOARD'
					? styles.checkerboard
					: '',
	].join(' ');

	return (
		<div className={styles.scrollable}>
			{src ? (
				<img
					src={src}
					alt={alt}
					className={imageClassName}
					width={width}
					height={height}
				/>
			) : (
				<div className={imageClassName} style={{width, height}} />
			)}
		</div>
	);
}
