using UndertaleModLib;

namespace UndertaleModToolWASM;

/// <summary>
/// UndertaleModTool refers to asset types as 'models' in
/// the <c>UndertaleModLib.Models</c> namespace, see also
/// the <see cref="UndertaleData" /> properties
/// </summary>
public enum ModelType
{
    /// <seealso cref="UndertaleData.GeneralInfo"/>
    GeneralInfo = 0,

    /// <seealso cref="UndertaleData.Options"/>
    Options = 1,

    /// <seealso cref="UndertaleData.Language"/>
    Language = 2,

    /// <seealso cref="UndertaleData.Extensions"/>
    Extensions = 3,

    /// <seealso cref="UndertaleData.Sounds"/>
    Sounds = 4,

    /// <seealso cref="UndertaleData.AudioGroups"/>
    AudioGroups = 5,

    /// <seealso cref="UndertaleData.Sprites"/>
    Sprites = 6,

    /// <seealso cref="UndertaleData.Backgrounds"/>
    Backgrounds = 7,

    /// <seealso cref="UndertaleData.Paths"/>
    Paths = 8,

    /// <seealso cref="UndertaleData.Scripts"/>
    Scripts = 9,

    /// <seealso cref="UndertaleData.GlobalInitScripts"/>
    GlobalInitScripts = 10,

    /// <seealso cref="UndertaleData.GameEndScripts"/>
    GameEndScripts = 12,

    /// <seealso cref="UndertaleData.Shaders"/>
    Shaders = 13,

    /// <seealso cref="UndertaleData.Fonts"/>
    Fonts = 14,

    /// <seealso cref="UndertaleData.Timelines"/>
    Timelines = 15,

    /// <seealso cref="UndertaleData.GameObjects"/>
    GameObjects = 16,

    /// <seealso cref="UndertaleData.Rooms"/>
    Rooms = 17,

    /// <seealso cref="UndertaleData.TexturePageItems"/>
    TexturePageItems = 18,

    /// <seealso cref="UndertaleData.Code"/>
    Code = 19,

    /// <seealso cref="UndertaleData.Variables"/>
    Variables = 20,

    /// <seealso cref="UndertaleData.Functions"/>
    Functions = 21,

    /// <seealso cref="UndertaleData.CodeLocals"/>
    CodeLocals = 22,

    /// <seealso cref="UndertaleData.Strings"/>
    Strings = 23,

    /// <seealso cref="UndertaleData.EmbeddedImages"/>
    EmbeddedImages = 24,

    /// <seealso cref="UndertaleData.EmbeddedTextures"/>
    EmbeddedTextures = 25,

    /// <seealso cref="UndertaleData.TextureGroupInfo"/>
    TextureGroupInfo = 26,

    /// <seealso cref="UndertaleData.EmbeddedAudio"/>
    EmbeddedAudio = 27,

    /// <seealso cref="UndertaleData.Tags"/>
    Tags = 28,

    /// <seealso cref="UndertaleData.AnimationCurves"/>
    AnimationCurves = 29,

    /// <seealso cref="UndertaleData.Sequences"/>
    Sequences = 30,

    /// <seealso cref="UndertaleData.FeatureFlags"/>
    FeatureFlags = 31,

    /// <seealso cref="UndertaleData.FilterEffects"/>
    FilterEffects = 32,

    /// <seealso cref="UndertaleData.ParticleSystems"/>
    ParticleSystems = 33,

    /// <seealso cref="UndertaleData.ParticleSystemEmitters"/>
    ParticleSystemEmitters = 34,
}
