/// <summary>
/// UndertaleModTool refers to asset types as 'models' in
/// the <c>UndertaleModLib.Models</c> namespace, see also
/// the <see cref="UndertaleModLib.UndertaleData" /> properties
/// </summary>
export const ModelType = {
	/// <summary>
	/// General info of the data file.
	/// </summary>
	GeneralInfo: 0,

	/// <summary>
	/// General Options of the data file.
	/// </summary>
	Options: 1,

	/// <summary>
	/// Languages of the data file.
	/// </summary>
	Language: 2,

	/// <summary>
	/// The used extensions of the data file.
	/// </summary>
	Extensions: 3,

	/// <summary>
	/// The used sounds of the data file.
	/// </summary>
	Sounds: 4,

	/// <summary>
	/// The audio groups of the data file.
	/// </summary>
	AudioGroups: 5,

	/// <summary>
	/// The sprites of the data file.
	/// </summary>
	Sprites: 6,

	/// <summary>
	/// The backgrounds (or Tilesets) of the data file.
	/// </summary>
	Backgrounds: 7,

	/// <summary>
	/// The paths of the data file.
	/// </summary>
	Paths: 8,

	/// <summary>
	/// The scripts of the data file.
	/// </summary>
	Scripts: 9,

	/// <summary>
	/// The global initialization scripts of the data file.
	/// </summary>
	GlobalInitScripts: 10,

	/// <summary>
	/// The global end scripts of the data file.
	/// </summary>
	GameEndScripts: 12,

	/// <summary>
	/// The used shaders of the data file.
	/// </summary>
	Shaders: 13,

	/// <summary>
	/// The fonts of the data file.
	/// </summary>
	Fonts: 14,

	/// <summary>
	/// The Timelines of the data file.
	/// </summary>
	Timelines: 15,

	/// <summary>
	/// The game objects of the data file.
	/// </summary>
	GameObjects: 16,

	/// <summary>
	/// The rooms of the data file.
	/// </summary>
	Rooms: 17,

	/// <summary>
	/// The texture page items from the data file.
	/// </summary>
	TexturePageItems: 18,

	/// <summary>
	/// The code entries of the data file.
	/// </summary>
	Code: 19,

	/// <summary>
	/// The used variables of the data file.
	/// </summary>
	Variables: 20,

	/// <summary>
	/// The functions of the data file.
	/// </summary>
	Functions: 21,

	/// <summary>
	/// The code locals of the data file.
	/// </summary>
	CodeLocals: 22,

	/// <summary>
	/// The used strings of the data file.
	/// </summary>
	Strings: 23,

	/// <summary>
	/// The embedded images of the data file. This is used to store built-in particle sprites,
	/// every time you use <c>part_sprite</c> functions.
	/// </summary>
	EmbeddedImages: 24,

	/// <summary>
	/// The embedded textures of the data file.
	/// </summary>
	EmbeddedTextures: 25,

	/// <summary>
	/// The texture group infos of the data file.
	/// </summary>
	TextureGroupInfo: 26,

	/// <summary>
	/// The embedded audio of the data file.
	/// </summary>
	EmbeddedAudio: 27,

	/// <summary>
	/// The used tags of the data file.
	/// </summary>
	Tags: 28,

	/// <summary>
	/// The animation curves of the data file.
	/// </summary>
	AnimationCurves: 29,

	/// <summary>
	/// The sequences of the data file.
	/// </summary>
	Sequences: 30,

	/// <summary>
	/// The feature flags stored in the data file.
	/// </summary>
	FeatureFlags: 31,

	/// <summary>
	/// The filter effects stored in the data file.
	/// </summary>
	FilterEffects: 32,

	/// <summary>
	/// The particle systems stored in the data file.
	/// </summary>
	ParticleSystems: 33,

	/// <summary>
	/// The particle system emitters stored in the data file.
	/// </summary>
	ParticleSystemEmitters: 34,
} as const;

export type ModelTypeKeys = (typeof ModelType)[keyof typeof ModelType];
