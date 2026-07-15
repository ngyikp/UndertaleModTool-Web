import {create} from 'zustand';

import type {GameInfoType} from './GameInfoType';

type DataStore = {
	gameInfo: GameInfoType | null;
	code: {
		entries: Map<string, string>;
		hasLoaded: boolean;
	};

	setGameInfo: (newGameInfo: GameInfoType | null) => void;
	reset: () => void;

	replaceCodeEntries: (entries: Map<string, string>) => void;
	setCodeByName: (name: string, sourceCode: string) => void;
};

export const useDataStore = create<DataStore>((set, _get, store) => ({
	gameInfo: null,
	code: {
		entries: new Map(),
		hasLoaded: false,
	},

	setGameInfo(newGameInfo) {
		set(() => {
			return {
				gameInfo: newGameInfo,
			};
		});
	},
	reset() {
		set(store.getInitialState());
	},

	// todo should be more generalized for every asset type
	replaceCodeEntries(entries) {
		set(() => {
			return {
				code: {
					entries,
					hasLoaded: true,
				},
			};
		});
	},
	setCodeByName(name, sourceCode) {
		set((state) => ({
			code: {
				...state.code,
				entries: new Map(state.code.entries).set(name, sourceCode),
			},
		}));
	},
}));
