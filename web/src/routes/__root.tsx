import {createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';

import DocumentTitle from '../common/DocumentTitle';
import type {MyRouterContext} from '../main';

function RootLayout() {
	return (
		<>
			<DocumentTitle text="" />

			<main id="main">
				<Outlet />
			</main>

			<TanStackRouterDevtools />
		</>
	);
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootLayout,
});
