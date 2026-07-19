import {Alert, Stack, Tabs, Title} from '@mantine/core';
import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
} from '@tanstack/react-router';
import {useState} from 'react';

import DataFileInput from '../../common/DataFileInput';
import getGameDisplayName from '../../common/getGameDisplayName';
import getTileSetsLabel from '../../common/getTileSetsLabel';
import {useDataStore} from '../../data-store';
import type {WorkerStatuses} from '../../worker/WorkerMessageTypes';

function TabLink({link, text}: {link: string; text: string}) {
	return (
		<Tabs.Tab
			value={link}
			renderRoot={(props) => <Link to={link} preload="intent" {...props} />}
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
		throw new GameDataNotLoadedError();
	}

	return (
		<Stack>
			<Title>{getGameDisplayName(info)}</Title>

			<Tabs value={'/' + (pathname.split('/')[1] ?? '')}>
				<Tabs.List>
					<TabLink link="/general-info" text="General info" />

					<TabLinkWithCount
						count={info.ItemCounts.Sprites}
						link="/sprites"
						text="Sprites"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Sounds}
						link="/sounds"
						text="Sounds"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Backgrounds}
						link="/tile-sets"
						text={getTileSetsLabel(info, true)}
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Paths}
						link="/paths"
						text="Paths"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Scripts}
						link="/scripts"
						text="Scripts"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Shaders}
						link="/shaders"
						text="Shaders"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Fonts}
						link="/fonts"
						text="Fonts"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Timelines}
						link="/timelines"
						text="Timelines"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.GameObjects}
						link="/objects"
						text="Objects"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Rooms}
						link="/rooms"
						text="Rooms"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Extensions}
						link="/extensions"
						text="Extensions"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.Code}
						link="/code"
						text="Code"
					/>

					<TabLinkWithCount
						count={info.ItemCounts.EmbeddedTextures}
						link="/embedded-textures"
						text="Embedded textures"
					/>
				</Tabs.List>
			</Tabs>

			<Outlet />
		</Stack>
	);
}

function GameDataNotLoadedComponent({error}: {error: Error}) {
	const [status, setStatus] = useState<WorkerStatuses | null>(null);

	if (error instanceof GameDataNotLoadedError) {
		return (
			<Stack>
				<Title>UndertaleModTool on the Web</Title>

				{status == null ? (
					<Alert variant="light" color="blue" title="No game data is loaded." />
				) : null}

				<DataFileInput onStatusChanged={setStatus} />
			</Stack>
		);
	}

	throw error;
}

class GameDataNotLoadedError extends Error {}

export const Route = createFileRoute('/_app')({
	component: AppLayout,
	beforeLoad: ({context}) => {
		if (context.gameInfo == null) {
			throw new GameDataNotLoadedError();
		}
	},
	errorComponent: GameDataNotLoadedComponent,
});
