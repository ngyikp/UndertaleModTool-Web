import {Alert, Button, Group, List, Stack} from '@mantine/core';
import {useQueryClient} from '@tanstack/react-query';
import {createFileRoute, Link, useNavigate} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import ExternalLinkInNewWindow from '../../common/ExternalLinkInNewWindow';
import Footer from '../../common/Footer';
import getTileSetsLabel from '../../common/getTileSetsLabel';
import YycWarningAlert from '../../common/YycWarningAlert';
import {useDataStore} from '../../data-store';
import {stopWorker} from '../../worker/worker-handler';

function GeneralInfo() {
	const info = useDataStore((state) => state.gameInfo);
	const resetDataStore = useDataStore((state) => state.reset);

	const navigate = useNavigate({from: '/general-info'});
	const queryClient = useQueryClient();

	function unloadGame() {
		stopWorker();

		resetDataStore();
		queryClient.removeQueries();

		void navigate({to: '/'});
	}

	if (info == null) {
		return null;
	}

	return (
		<Stack>
			<DocumentTitle text="General info" />

			<Group>
				<Button variant="default" onClick={unloadGame}>
					Unload game
				</Button>
			</Group>

			{info.IsUnsupportedBytecodeVersion ? (
				<Alert
					variant="light"
					color="yellow"
					title={`Only bytecode versions 13 to 17 are properly supported, this game data is bytecode version ${info.BytecodeVersion.toString()}.`}
				/>
			) : null}

			{info.IsYYC ? <YycWarningAlert /> : null}

			{!info.IsDebuggerDisabled ? (
				<Alert
					variant="light"
					color="yellow"
					title="This game is set to run with the GameMaker debugger and the normal runtime will simply hang after loading if the debugger is not running."
				/>
			) : null}

			<p>Display name: {info.DisplayName}</p>
			<p>Project name: {info.ProjectName}</p>

			<p>Is GMS2: {info.IsGameMaker2 ? 'Yes' : 'No'}</p>
			<p>
				<ExternalLinkInNewWindow href="https://manual.gamemaker.io/monthly/en/Settings/YoYo_Compiler.htm">
					Is YYC:
				</ExternalLinkInNewWindow>{' '}
				{info.IsYYC ? 'Yes' : 'No'}
			</p>
			<p>Bytecode version: {info.BytecodeVersion}</p>
			<p>
				<ExternalLinkInNewWindow href="https://manual.gamemaker.io/monthly/en/Settings/Configurations.htm">
					Configuration name:
				</ExternalLinkInNewWindow>{' '}
				{info.ConfigurationName}
			</p>
			<p>
				Engine version: {info.Version.Major}.{info.Version.Minor}.
				{info.Version.Release}.{info.Version.Build}
			</p>

			<List>
				<List.Item>
					<Link to="/sprites" preload="intent">
						{info.ItemCounts.Sprites} sprites
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/sounds" preload="intent">
						{info.ItemCounts.Sounds} sounds
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/objects" preload="intent">
						{info.ItemCounts.GameObjects} objects
					</Link>
				</List.Item>

				{!info.IsYYC ? (
					<List.Item>
						<Link to="/code" preload="intent">
							{info.ItemCounts.Code} code entries
						</Link>
					</List.Item>
				) : null}

				<List.Item>
					<Link to="/rooms" preload="intent">
						{info.ItemCounts.Rooms} rooms
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/tile-sets" preload="intent">
						{info.ItemCounts.Backgrounds} {getTileSetsLabel(info)}
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/fonts" preload="intent">
						{info.ItemCounts.Fonts} fonts
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/shaders" preload="intent">
						{info.ItemCounts.Shaders} shaders
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/paths" preload="intent">
						{info.ItemCounts.Paths} paths
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/particle-systems" preload="intent">
						{info.ItemCounts.ParticleSystems} particle systems
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/particle-system-emitters" preload="intent">
						{info.ItemCounts.ParticleSystemEmitters} particle system emitters
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/timelines" preload="intent">
						{info.ItemCounts.Timelines} timelines
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/audio-groups" preload="intent">
						{info.ItemCounts.AudioGroups} audio groups
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/extensions" preload="intent">
						{info.ItemCounts.Extensions} extensions
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/embedded-textures" preload="intent">
						{info.ItemCounts.EmbeddedTextures} embedded textures
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/embedded-images" preload="intent">
						{info.ItemCounts.EmbeddedImages} embedded images
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/texture-groups" preload="intent">
						{info.ItemCounts.TextureGroupInfo} texture groups
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/texture-pages" preload="intent">
						{info.ItemCounts.TexturePageItems} texture pages
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/scripts" preload="intent">
						{info.ItemCounts.Scripts} scripts
					</Link>
				</List.Item>

				{!info.IsYYC ? (
					<>
						<List.Item>
							<Link to="/variables" preload="intent">
								{info.ItemCounts.Variables} variables
							</Link>
						</List.Item>

						<List.Item>
							<Link to="/functions" preload="intent">
								{info.ItemCounts.Functions} functions
							</Link>
						</List.Item>

						{info.ItemCounts.CodeLocals > 0 ? (
							<List.Item>
								<Link to="/code-locals" preload="intent">
									{info.ItemCounts.CodeLocals} code locals
								</Link>
							</List.Item>
						) : null}
					</>
				) : null}

				<List.Item>
					<Link to="/strings" preload="intent">
						{info.ItemCounts.Strings} strings
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/global-init" preload="intent">
						{info.ItemCounts.GlobalInitScripts} global init scripts
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/embedded-audio" preload="intent">
						{info.ItemCounts.EmbeddedAudio} embedded audio
					</Link>
				</List.Item>
			</List>

			<Footer />
		</Stack>
	);
}

export const Route = createFileRoute('/_app/general-info')({
	component: GeneralInfo,
});
