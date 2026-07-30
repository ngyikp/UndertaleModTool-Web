import {Alert, Stack, Tabs, Title, Tooltip} from '@mantine/core';
import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
} from '@tanstack/react-router';

import DataFileInput from '../../common/DataFileInput';
import Footer from '../../common/Footer';
import getGameDisplayName from '../../common/getGameDisplayName';
import getTileSetsLabel from '../../common/getTileSetsLabel';
import {useDataStore} from '../../data-store';

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

function TabLinkHideIfEmpty({
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

	return <TabLink link={link} text={text} />;
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
			<Title className="break-word">{getGameDisplayName(info)}</Title>

			<Tabs value={'/' + (pathname.split('/')[1] ?? '')}>
				<Tabs.List>
					<TabLink link="/general-info" text="General info" />

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Sprites}
						link="/sprites"
						text="Sprites"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Sounds}
						link="/sounds"
						text="Sounds"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.GameObjects}
						link="/objects"
						text="Objects"
					/>

					{!info.IsYYC ? (
						<TabLinkHideIfEmpty
							count={info.ItemCounts.Code}
							link="/code"
							text="Code"
						/>
					) : (
						<Tooltip
							label="This game uses YYC which means viewing the source code is not possible"
							events={{hover: true, focus: true, touch: true}}
							multiline
						>
							<Tabs.Tab value="/code" disabled>
								Code
							</Tabs.Tab>
						</Tooltip>
					)}

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Rooms}
						link="/rooms"
						text="Rooms"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Backgrounds}
						link="/tile-sets"
						text={getTileSetsLabel(info, true)}
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Fonts}
						link="/fonts"
						text="Fonts"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Shaders}
						link="/shaders"
						text="Shaders"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Paths}
						link="/paths"
						text="Paths"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.ParticleSystems}
						link="/particle-systems"
						text="Particle systems"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.ParticleSystemEmitters}
						link="/particle-system-emitters"
						text="Particle system emitters"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.AudioGroups}
						link="/audio-groups"
						text="Audio groups"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Timelines}
						link="/timelines"
						text="Timelines"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Extensions}
						link="/extensions"
						text="Extensions"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.EmbeddedTextures}
						link="/embedded-textures"
						text="Embedded textures"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.EmbeddedImages}
						link="/embedded-images"
						text="Embedded images"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.TextureGroupInfo}
						link="/texture-groups"
						text="Texture groups"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.TexturePageItems}
						link="/texture-pages"
						text="Texture pages"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Scripts}
						link="/scripts"
						text="Scripts"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Variables}
						link="/variables"
						text="Variables"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Functions}
						link="/functions"
						text="Functions"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.CodeLocals}
						link="/code-locals"
						text="Code locals"
					/>

					<TabLinkHideIfEmpty
						count={info.ItemCounts.Strings}
						link="/strings"
						text="Strings"
					/>

					{!info.IsYYC ? (
						<TabLinkHideIfEmpty
							count={info.ItemCounts.GlobalInitScripts}
							link="/global-init"
							text="Global init scripts"
						/>
					) : null}

					<TabLinkHideIfEmpty
						count={info.ItemCounts.EmbeddedAudio}
						link="/embedded-audio"
						text="Embedded audio"
					/>
				</Tabs.List>
			</Tabs>

			<Outlet />
		</Stack>
	);
}

function GameDataNotLoadedComponent({error}: {error: Error}) {
	if (error instanceof GameDataNotLoadedError) {
		return (
			<Stack>
				<Title>UndertaleModTool on the Web</Title>

				<DataFileInput
					initialStatusMessage={
						<Alert
							variant="light"
							color="blue"
							title="No game data is loaded."
						/>
					}
				/>

				<Footer />
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
