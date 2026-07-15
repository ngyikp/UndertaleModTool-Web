import {Alert, Button, Group, List, Stack} from '@mantine/core';
import {useQueryClient} from '@tanstack/react-query';
import {createFileRoute, Link, useNavigate} from '@tanstack/react-router';

import {useDataStore} from '../../data-store';
import DocumentTitle from '../../DocumentTitle';
import {stopWorker} from '../../worker/worker-handler';

function GeneralInfo() {
	const info = useDataStore((state) => state.gameInfo);
	const resetDataStore = useDataStore((state) => state.reset);

	const navigate = useNavigate({from: '/general-info'});
	const queryClient = useQueryClient();

	function unloadGame() {
		stopWorker();
		resetDataStore();
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

			{info.IsYYC ? (
				<Alert
					variant="light"
					color="yellow"
					title="This game uses YYC (YoYo Compiler) which means the code is embedded into the game executable. This configuration is currently not fully supported; continue at your own risk."
				/>
			) : null}

			<p>Is GMS2: {info.IsGameMaker2 ? 'Yes' : 'No'}</p>
			<p>Is YYC: {info.IsYYC ? 'Yes' : 'No'}</p>
			<p>Bytecode version: {info.BytecodeVersion}</p>
			<p>Configuration name: {info.ConfigurationName}</p>

			<List>
				<List.Item>{info.ItemCounts.Sounds} sounds</List.Item>
				<List.Item>
					<Link to="/sprites">{info.ItemCounts.Sprites} sprites</Link>
				</List.Item>
				<List.Item>{info.ItemCounts.Backgrounds} backgrounds</List.Item>
				<List.Item>{info.ItemCounts.Paths} paths</List.Item>
				<List.Item>{info.ItemCounts.Scripts} scripts</List.Item>
				<List.Item>{info.ItemCounts.Shaders} shaders</List.Item>
				<List.Item>{info.ItemCounts.Fonts} fonts</List.Item>
				<List.Item>{info.ItemCounts.Timelines} timelines</List.Item>
				<List.Item>{info.ItemCounts.GameObjects} game objects</List.Item>
				<List.Item>{info.ItemCounts.Rooms} rooms</List.Item>
				<List.Item>{info.ItemCounts.Extensions} extensions</List.Item>
				<List.Item>
					{info.ItemCounts.TexturePageItems} texture page items
				</List.Item>
				<List.Item>{info.ItemCounts.Strings} strings</List.Item>
				<List.Item>
					{info.ItemCounts.EmbeddedTextures} embedded textures
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
