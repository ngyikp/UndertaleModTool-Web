import type {QueryClient} from '@tanstack/react-query';
import {createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';

import type {GameInfoType} from '../types/GameInfoType';

function RootLayout() {
	return (
		<>
			<main id="main">
				<Outlet />
			</main>

			<TanStackRouterDevtools />
		</>
	);
}

type MyRouterContext = {
	gameInfo: GameInfoType | null;
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootLayout,
});
