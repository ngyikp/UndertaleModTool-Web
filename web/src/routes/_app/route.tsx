import {Stack, Title, Tabs, Alert, Button} from '@mantine/core';
import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
} from '@tanstack/react-router';

import {useDataStore} from '../../data-store';

function AppLayout() {
	const info = useDataStore((state) => state.gameInfo);

	const location = useLocation();

	if (info == null) {
		return (
			<Stack>
				<Title>UndertaleModTool on the Web</Title>

				<Alert variant="light" color="red" title="No game data is loaded.">
					<Button component={Link} to="/">
						Go to homepage
					</Button>
				</Alert>
			</Stack>
		);
	}

	return (
		<Stack>
			<Title>{info.ProjectName}</Title>

			<Tabs value={location.pathname}>
				<Tabs.List>
					<Tabs.Tab
						value="/general-info"
						renderRoot={(props) => <Link to="/general-info" {...props} />}
					>
						General info
					</Tabs.Tab>

					{info.ItemCounts.Code > 0 ? (
						<Tabs.Tab
							value="/code"
							renderRoot={(props) => <Link to="/code" {...props} />}
						>
							Code ({info.ItemCounts.Code})
						</Tabs.Tab>
					) : null}
				</Tabs.List>
			</Tabs>

			<Outlet />
		</Stack>
	);
}

export const Route = createFileRoute('/_app')({
	component: AppLayout,
});
