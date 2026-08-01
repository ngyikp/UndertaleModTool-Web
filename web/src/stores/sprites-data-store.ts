import {create} from 'zustand';

type SpritesDataStore = {
	currentPage: Map<string, number>;
	getCurrentPage: (name: string) => number;
	setCurrentPage: (name: string, page: number) => void;

	viewAll: boolean;
	setViewAll: (viewAll: boolean) => void;

	reset: () => void;
};

export const useSpritesDataStore = create<SpritesDataStore>(
	(set, _get, store) => ({
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

		reset() {
			set(store.getInitialState());
		},
	}),
);
