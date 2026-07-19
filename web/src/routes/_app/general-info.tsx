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
				<List.Item>{info.ItemCounts.Extensions} extensions</List.Item>
				<List.Item>
					{info.ItemCounts.TexturePageItems} texture page items
				</List.Item>
				<List.Item>{info.ItemCounts.Strings} strings</List.Item>
				<List.Item>
					<Link to="/embedded-textures">
						{info.ItemCounts.EmbeddedTextures} embedded textures
					</Link>
				</List.Item>
				<List.Item>{info.ItemCounts.EmbeddedAudio} embedded audio</List.Item>

				{!info.IsYYC ? (
					<>
						<List.Item>
							<Link to="/code">{info.ItemCounts.Code} code entries</Link>
						</List.Item>
						<List.Item>{info.ItemCounts.Variables} variables</List.Item>
						<List.Item>{info.ItemCounts.Functions} functions</List.Item>
						{info.ItemCounts.CodeLocals > 0 ? (
							<List.Item>{info.ItemCounts.CodeLocals} code locals</List.Item>
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
