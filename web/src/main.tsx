import {MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RouterProvider, createRouter} from '@tanstack/react-router';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// Import the generated route tree
import {routeTree} from './routeTree.gen';

import './index.css';

const root = document.getElementById('root');
if (!root) {
	throw new Error('Missing app root container');
}

const router = createRouter({
	routeTree,
	scrollRestoration: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Our 'server' that we're talking to is a local WebAssembly
			// The data is processed once and no remote clients can affect it
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,

			// If something fails due to a .NET exception, then retrying
			// is unlikely to help
			retry: false,
		},
	},
});

createRoot(root).render(
	<StrictMode>
		<MantineProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />

				<ReactQueryDevtools />
			</QueryClientProvider>
		</MantineProvider>
	</StrictMode>,
);
