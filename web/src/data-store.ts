import {create} from 'zustand';

import type {SortableListSettings} from './common/SortableList';
import type {GameInfoType} from './types/GameInfoType';

type DataStore = {
	gameInfo: GameInfoType | null;

	sortableListSettings: Map<string, SortableListSettings>;

	setGameInfo: (newGameInfo: GameInfoType | null) => void;
	setSortableListSettings: (
		id: string,
		newSettings: SortableListSettings,
	) => void;
	reset: () => void;
};

export const useDataStore = create<DataStore>((set, _get, store) => ({
	gameInfo: null,

	sortableListSettings: new Map(),

	setGameInfo(newGameInfo) {
		set(() => {
			return {
				gameInfo: newGameInfo,
			};
		});
	},
	setSortableListSettings(id, newSettings) {
		set((state) => {
			return {
				sortableListSettings: new Map(state.sortableListSettings).set(
					id,
					newSettings,
				),
			};
		});
	},
	reset() {
		set(store.getInitialState());
	},
}));
