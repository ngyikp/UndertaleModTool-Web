import {createTheme, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {createRouter} from '@tanstack/react-router';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import BasicErrorAlert from './common/BasicErrorAlert';
import BasicLoadingMessage from './common/BasicLoadingMessage';
import PageNotFound from './PageNotFound';
import RouterProviderWithContext from './RouterProviderWithContext';
import {routeTree} from './routeTree.gen';
import {ManagedErrorFromDotNet} from './worker/ManagedErrorFromDotNet';

import './index.css';

const root = document.getElementById('root');
if (!root) {
	throw new Error('Missing app root container');
}

const theme = createTheme({
	cursorType: 'pointer',
});

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

			// Disable stale data, the data is processed once anyway
			staleTime: Infinity,
		},
	},
});

const router = createRouter({
	context: {
		gameInfo: null,
		queryClient,
	},
	defaultOnCatch(error) {
		if (error instanceof ManagedErrorFromDotNet) {
			console.error('Exception in .NET:\n\n' + error.stack);
		}
	},
	defaultErrorComponent: ({error}) => {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message.endsWith('NativeMagickSettings')) {
				return (
					<BasicErrorAlert error="This functionality requires ImageMagick which is not implemented on the web version yet." />
				);
			}
		}

		return <BasicErrorAlert error={error} />;
	},
	defaultNotFoundComponent: () => <PageNotFound />,
	defaultPendingComponent: () => <BasicLoadingMessage />,
	// https://tanstack.com/router/latest/docs/guide/data-loading#passing-all-loader-events-to-an-external-cache
	defaultPreloadStaleTime: 0,
	routeTree,
	scrollRestoration: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(root).render(
	<StrictMode>
		<MantineProvider defaultColorScheme="auto" theme={theme}>
			<QueryClientProvider client={queryClient}>
				<RouterProviderWithContext router={router} />

				<ReactQueryDevtools />
			</QueryClientProvider>
		</MantineProvider>
	</StrictMode>,
);
