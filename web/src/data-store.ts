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
	setSortableListSettings: (
		id: string,
		newSettings: SortableListSettings,
	) => void;

	imageViewerSettings: ImageViewerSettings;
	setImageViewerSettings: (newSettings: ImageViewerSettings) => void;

	codeShowChildEntries: boolean;
	setCodeShowChildEntries: (showChildEntries: boolean) => void;

	codeEditorWordWrap: boolean;
	setCodeEditorWordWrap: (codeEditorWordWrap: boolean) => void;

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

	imageViewerSettings: {
		appearance: 'CHECKERBOARD',
	},
	setImageViewerSettings(newSettings) {
		set(() => {
			return {
				imageViewerSettings: newSettings,
			};
		});
	},

	codeShowChildEntries: false,
	setCodeShowChildEntries(codeShowChildEntries) {
		set(() => {
			return {
				codeShowChildEntries,
			};
		});
	},

	codeEditorWordWrap: false,
	setCodeEditorWordWrap(codeEditorWordWrap) {
		set(() => {
			return {
				codeEditorWordWrap,
			};
		});
	},

	reset() {
		set(store.getInitialState());
	},
}));
