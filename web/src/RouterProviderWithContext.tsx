import {RouterProvider} from '@tanstack/react-router';

import {useDataStore} from './data-store';

type Props = Readonly<{
	router: React.ComponentProps<typeof RouterProvider>['router'];
}>;

export default function RouterProviderWithContext({router}: Props) {
	const gameInfo = useDataStore((state) => state.gameInfo);
	// const {data: gameInfo} = useQuery(getGameInfoQueryOptions());

	return <RouterProvider router={router} context={{gameInfo}} />;
}
