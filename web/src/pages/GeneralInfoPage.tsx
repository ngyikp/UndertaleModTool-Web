import {Stack, Alert, Button, Group} from '@mantine/core';

import type {GameInfoType} from '../GameInfoType';

type Props = Readonly<{
	info: GameInfoType;
	setInfo: (newInfo: GameInfoType | null) => void;
}>;

export default function GeneralInfoPage({info, setInfo}: Props) {
	function unloadGame() {
		setInfo(null);
	}

	return (
		<Stack>
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

			<ul>
				<li>{info.ItemCounts.Sounds} sounds</li>
				<li>{info.ItemCounts.Sprites} sprites</li>
				<li>{info.ItemCounts.Backgrounds} backgrounds</li>
				<li>{info.ItemCounts.Paths} paths</li>
				<li>{info.ItemCounts.Scripts} scripts</li>
				<li>{info.ItemCounts.Shaders} shaders</li>
				<li>{info.ItemCounts.Fonts} fonts</li>
				<li>{info.ItemCounts.Timelines} timelines</li>
				<li>{info.ItemCounts.GameObjects} game objects</li>
				<li>{info.ItemCounts.Rooms} rooms</li>
				<li>{info.ItemCounts.Extensions} extensions</li>
				<li>{info.ItemCounts.TexturePageItems} texture page items</li>
				<li>{info.ItemCounts.Strings} strings</li>
				<li>{info.ItemCounts.EmbeddedTextures} embedded textures</li>
				<li>{info.ItemCounts.EmbeddedAudio} embedded audio</li>

				{!info.IsYYC ? (
					<>
						<li>{info.ItemCounts.Code} code entries</li>
						<li>{info.ItemCounts.Variables} variables</li>
						<li>{info.ItemCounts.Functions} functions</li>
						{info.ItemCounts.CodeLocals > 0 ? (
							<li>{info.ItemCounts.CodeLocals} code locals</li>
						) : null}
					</>
				) : null}
			</ul>
		</Stack>
	);
}
