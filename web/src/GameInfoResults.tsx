import type {GameInfoType} from './GameInfo';

type Props = Readonly<{
	info: GameInfoType;
}>;

export default function GameInfoResults({info}: Props) {
	return (
		<>
			<p>Project Name: {info.ProjectName}</p>
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
		</>
	);
}
