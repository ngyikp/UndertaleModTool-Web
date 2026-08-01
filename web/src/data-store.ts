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

	reset() {
		set(store.getInitialState());
	},
}));
