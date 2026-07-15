import {Alert, Button, Stack, Tabs, Title} from '@mantine/core';
import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
} from '@tanstack/react-router';

import {useDataStore} from '../../data-store';

function TabLink({link, text}: {link: string; text: string}) {
	return (
		<Tabs.Tab
			value={link}
			renderRoot={(props) => <Link to={link} {...props} />}
		>
			{text}
		</Tabs.Tab>
	);
}

function TabLinkWithCount({
	count,
	link,
	text,
}: {
	count: number;
	link: string;
	text: string;
}) {
	if (count === 0) {
		return null;
	}

	return <TabLink link={link} text={`${text} (${count.toString()})`} />;
}

function AppLayout() {
	const info = useDataStore((state) => state.gameInfo);

	const pathname = useLocation({
		select: (location) => location.pathname,
	});

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

			<Tabs value={pathname}>
				<Tabs.List>
					<TabLink link="/general-info" text="General info" />

					<TabLinkWithCount
						count={info.ItemCounts.Sprites}
						link="/sprites"
						text="Sprites"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Code}
						link="/code"
						text="Code"
					/>
				</Tabs.List>
			</Tabs>

			<Outlet />
		</Stack>
	);
}

export const Route = createFileRoute('/_app')({
	component: AppLayout,
});
