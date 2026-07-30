import {create} from 'zustand';

import type {ImageViewerSettings} from './common/image/ImageViewer';
import type {SortableListSettings} from './common/SortableList';
import type {DataFileLoadInfoType} from './messages/readFile';
import type {GameInfoType} from './types/GameInfoType';

type DataStore = {
	// todo reconsider this as it's being handled by tanstack query now
	gameInfo: GameInfoType | null;
	setGameInfo: (newGameInfo: GameInfoType | null) => void;

	dataFileLoadInfo: DataFileLoadInfoType | null;
	setDataFileLoadInfo: (newInfo: DataFileLoadInfoType | null) => void;

	sortableListSettings: Map<string, SortableListSettings>;
	imageViewerSettings: ImageViewerSettings;

	setSortableListSettings: (
		id: string,
		newSettings: SortableListSettings,
	) => void;
	setImageViewerSettings: (newSettings: ImageViewerSettings) => void;

	spriteTextureCurrentPage: Map<string, number>;
	getSpriteTextureCurrentPage: (name: string) => number;
	setSpriteTextureCurrentPage: (name: string, page: number) => void;

	reset: () => void;
};

export const useDataStore = create<DataStore>((set, _get, store) => ({
	gameInfo: null,
	setGameInfo(newGameInfo) {
		set(() => {
			return {
				gameInfo: newGameInfo,
			};
		});
	},

	dataFileLoadInfo: null,
	setDataFileLoadInfo(newInfo) {
		set(() => {
			return {
				dataFileLoadInfo: newInfo,
			};
		});
	},

	sortableListSettings: new Map(),
	imageViewerSettings: {
		appearance: 'CHECKERBOARD',
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
	setImageViewerSettings(newSettings) {
		set(() => {
			return {
				imageViewerSettings: newSettings,
			};
		});
	},

	spriteTextureCurrentPage: new Map(),
	getSpriteTextureCurrentPage(name) {
		return store.getState().spriteTextureCurrentPage.get(name) ?? 0;
	},
	setSpriteTextureCurrentPage(name, page) {
		set((state) => {
			return {
				spriteTextureCurrentPage: new Map(state.spriteTextureCurrentPage).set(
					name,
					page,
				),
			};
		});
	},

	reset() {
		set(store.getInitialState());
	},
}));
