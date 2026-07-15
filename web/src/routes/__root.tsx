import type {QueryClient} from '@tanstack/react-query';
import {createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';

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

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootLayout,
});
