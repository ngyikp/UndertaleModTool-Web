import {useQueryClient} from '@tanstack/react-query';

import {useDataStore} from '../data-store';
import {useSpritesDataStore} from '../stores/sprites-data-store';

import EmbeddedTextureBlobCache from './image/EmbeddedTextureBlobCache';

export default function useUnloadGame() {
	const resetDataStore = useDataStore((state) => state.reset);
	const resetSpritesDataStore = useSpritesDataStore((state) => state.reset);
	const queryClient = useQueryClient();

	return () => {
		resetDataStore();
		resetSpritesDataStore();
		queryClient.removeQueries();
		EmbeddedTextureBlobCache.reset();
	};
}
