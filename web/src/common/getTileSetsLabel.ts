import type {GameInfoType} from '../types/GameInfoType';

// https://github.com/UnderminersTeam/UndertaleModTool/blob/2b6fe69722cec25219f1ae21f8111907c2a15629/UndertaleModTool/MainWindow.xaml.cs#L1159
export default function getTileSetsLabel(
	info: GameInfoType | null,
	capitalized: boolean = false,
): string {
	if (capitalized) {
		return info && info.Version.Major >= 2
			? 'Tile sets'
			: 'Tile sets/Backgrounds';
	}

	return info && info.Version.Major >= 2
		? 'tile sets'
		: 'tile sets/backgrounds';
}
