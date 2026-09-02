import {create} from 'zustand';

type ViewMode = 'LIST' | 'THUMBNAIL';

type SpritesDataStore = {
	viewMode: ViewMode;
	setViewMode: (viewMode: ViewMode) => void;

	thumbnailSize: number;
	setThumbnailSize: (thumbnailSize: number) => void;

	currentPage: Map<string, number>;
	getCurrentPage: (name: string) => number;
	setCurrentPage: (name: string, page: number) => void;

	viewAll: boolean;
	setViewAll: (viewAll: boolean) => void;

	includePadding: boolean;
	setIncludePadding: (viewAll: boolean) => void;

	reset: () => void;
};

export const useSpritesDataStore = create<SpritesDataStore>(
	(set, _get, store) => ({
		viewMode: 'LIST',
		setViewMode(viewMode) {
			set(() => {
				return {
					viewMode,
				};
			});
		},

		thumbnailSize: 140,
		setThumbnailSize(thumbnailSize) {
			set(() => {
				return {
					thumbnailSize,
				};
			});
		},

		currentPage: new Map(),
		getCurrentPage(name) {
			return store.getState().currentPage.get(name) ?? 0;
		},
		setCurrentPage(name, page) {
			set((state) => {
				return {
					currentPage: new Map(state.currentPage).set(name, page),
				};
			});
		},

		viewAll: false,
		setViewAll(viewAll) {
			set(() => {
				return {
					viewAll,
				};
			});
		},

		includePadding: true,
		setIncludePadding(includePadding) {
			set(() => {
				return {
					includePadding,
				};
			});
		},

		reset() {
			set(store.getInitialState());
		},
	}),
);
