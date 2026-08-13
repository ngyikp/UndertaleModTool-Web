// Based on https://tanstack.com/router/latest/docs/how-to/test-file-based-routing#3-create-route-testing-utilities

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createMemoryHistory, createRouter} from '@tanstack/react-router';
import {render} from '@testing-library/react';

import CustomMantine from '../../src/CustomMantine';
import RouterProviderWithContext from '../../src/RouterProviderWithContext';
import {routeTree} from '../../src/routeTree.gen';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const DEFAULT_CONTEXT = {
	gameInfo: null,
	queryClient,
};

// Create test router with generated route tree
function createTestRouterFromFiles(initialLocation = '/') {
	return createRouter({
		context: DEFAULT_CONTEXT,
		history: createMemoryHistory({
			initialEntries: [initialLocation],
		}),
		routeTree,
	});
}

// Custom render function for file-based routes
export function renderWithFileRoutes(initialLocation: string) {
	const router = createTestRouterFromFiles(initialLocation);

	render(
		<CustomMantine>
			<QueryClientProvider client={queryClient}>
				<RouterProviderWithContext router={router} />
			</QueryClientProvider>
		</CustomMantine>,
	);
}

// Helper to test specific file routes
export function createMockFileRoute(
	path: string,
	component: React.ComponentType,
) {
	// This is useful for isolated testing when you don't want to use the full route tree
	return {
		path,
		component,
		// Add other common route properties as needed
	};
}
