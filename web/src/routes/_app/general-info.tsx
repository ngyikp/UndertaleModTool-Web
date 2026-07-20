import {Alert, Button, Group, List, Stack} from '@mantine/core';
import {useQueryClient} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	useNavigate,
	useRouter,
} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import getTileSetsLabel from '../../common/getTileSetsLabel';
import YycWarningAlert from '../../common/YycWarningAlert';
import {useDataStore} from '../../data-store';
import {stopWorker} from '../../worker/worker-handler';

function GeneralInfo() {
	const info = useDataStore((state) => state.gameInfo);
	const resetDataStore = useDataStore((state) => state.reset);

	const navigate = useNavigate({from: '/general-info'});
	const router = useRouter();
	const queryClient = useQueryClient();

	function unloadGame() {
		stopWorker();

		resetDataStore();
		void router.invalidate();
		void queryClient.invalidateQueries();

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
				<a
					href="https://manual.gamemaker.io/monthly/en/Settings/YoYo_Compiler.htm"
					target="_blank"
					rel="noreferrer"
				>
					Is YYC:
				</a>{' '}
				{info.IsYYC ? 'Yes' : 'No'}
			</p>
			<p>Bytecode version: {info.BytecodeVersion}</p>
			<p>
				<a
					href="https://manual.gamemaker.io/monthly/en/Settings/Configurations.htm"
					target="_blank"
					rel="noreferrer"
				>
					Configuration name:
				</a>{' '}
				{info.ConfigurationName}
			</p>
			<p>
				Engine version: {info.Version.Major}.{info.Version.Minor}.
				{info.Version.Release}.{info.Version.Build}
			</p>

			<List>
				<List.Item>
					<Link to="/sprites">{info.ItemCounts.Sprites} sprites</Link>
				</List.Item>

				<List.Item>
					<Link to="/sounds">{info.ItemCounts.Sounds} sounds</Link>
				</List.Item>

				<List.Item>
					<Link to="/audio-groups">
						{info.ItemCounts.AudioGroups} audio groups
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/tile-sets">
						{info.ItemCounts.Backgrounds} {getTileSetsLabel(info)}
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/paths">{info.ItemCounts.Paths} paths</Link>
				</List.Item>

				<List.Item>
					<Link to="/scripts">{info.ItemCounts.Scripts} scripts</Link>
				</List.Item>

				<List.Item>
					<Link to="/shaders">{info.ItemCounts.Shaders} shaders</Link>
				</List.Item>

				<List.Item>
					<Link to="/fonts">{info.ItemCounts.Fonts} fonts</Link>
				</List.Item>

				<List.Item>
					<Link to="/timelines">{info.ItemCounts.Timelines} timelines</Link>
				</List.Item>

				<List.Item>
					<Link to="/objects">{info.ItemCounts.GameObjects} objects</Link>
				</List.Item>

				<List.Item>
					<Link to="/rooms">{info.ItemCounts.Rooms} rooms</Link>
				</List.Item>

				<List.Item>
					<Link to="/extensions">{info.ItemCounts.Extensions} extensions</Link>
				</List.Item>

				<List.Item>
					<Link to="/texture-pages">
						{info.ItemCounts.TexturePageItems} texture pages
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/texture-groups">
						{info.ItemCounts.TextureGroupInfo} texture groups
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/strings">{info.ItemCounts.Strings} strings</Link>
				</List.Item>

				<List.Item>
					<Link to="/global-init">
						{info.ItemCounts.GlobalInitScripts} global init scripts
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/embedded-textures">
						{info.ItemCounts.EmbeddedTextures} embedded textures
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/embedded-images">
						{info.ItemCounts.EmbeddedImages} embedded images
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/embedded-audio">
						{info.ItemCounts.EmbeddedAudio} embedded audio
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/particle-systems">
						{info.ItemCounts.ParticleSystems} particle systems
					</Link>
				</List.Item>

				<List.Item>
					<Link to="/particle-system-emitters">
						{info.ItemCounts.ParticleSystemEmitters} particle system emitters
					</Link>
				</List.Item>

				{!info.IsYYC ? (
					<>
						<List.Item>
							<Link to="/code">{info.ItemCounts.Code} code entries</Link>
						</List.Item>

						<List.Item>
							<Link to="/variables">{info.ItemCounts.Variables} variables</Link>
						</List.Item>

						<List.Item>
							<Link to="/functions">{info.ItemCounts.Functions} functions</Link>
						</List.Item>

						{info.ItemCounts.CodeLocals > 0 ? (
							<List.Item>
								<Link to="/code-locals">
									{info.ItemCounts.CodeLocals} code locals
								</Link>
							</List.Item>
						) : null}
					</>
				) : null}
			</List>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/general-info')({
	component: GeneralInfo,
});
