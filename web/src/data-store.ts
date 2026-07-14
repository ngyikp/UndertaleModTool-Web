import {create} from 'zustand';

import type {GameInfoType} from './GameInfoType';

type DataStore = {
	gameInfo: GameInfoType | null;
	setGameInfo: (newGameInfo: GameInfoType | null) => void;
};

export const useDataStore = create<DataStore>((set) => ({
	gameInfo: null,
	setGameInfo: (newGameInfo: GameInfoType | null) => {
		set(() => {
			return {
				gameInfo: newGameInfo,
			};
		});
	},
}));
