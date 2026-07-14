import {MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
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

const router = createRouter({routeTree});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(root).render(
	<StrictMode>
		<MantineProvider>
			<RouterProvider router={router} />
		</MantineProvider>
	</StrictMode>,
);
