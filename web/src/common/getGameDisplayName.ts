import type {GameInfoType} from '../types/GameInfoType';

export default function getGameDisplayName(info: GameInfoType): string {
	let t = '';

	if (info.DisplayName != null) {
		t += info.DisplayName;
	}

	if (info.ProjectName != null && info.DisplayName !== info.ProjectName) {
		if (t !== '') {
			t += ' (' + info.ProjectName + ')';
		} else {
			t += info.ProjectName;
		}
	}

	return t;
}
