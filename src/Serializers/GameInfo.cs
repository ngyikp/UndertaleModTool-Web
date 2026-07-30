using System.Text.Json.Serialization;
using UndertaleModLib;
using UndertaleModLib.Models;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// General info of the game. Keep this in sync with <c>web/src/types/GameInfoType.ts</c>
/// </summary>
public record GameInfo
{
    /// <seealso cref="UndertaleGeneralInfo.Name"/>
    public string? ProjectName { get; set; }

    /// <seealso cref="UndertaleGeneralInfo.DisplayName"/>
    public string? DisplayName { get; set; }

    /// <seealso cref="UndertaleData.IsGameMaker2()"/>
    public bool IsGameMaker2 { get; set; }

    /// <seealso cref="UndertaleData.IsYYC()"/>
    public bool IsYYC { get; set; }

    /// <seealso cref="UndertaleGeneralInfo.IsDebuggerDisabled"/>
    public bool IsDebuggerDisabled { get; set; }

    /// <seealso cref="UndertaleData.UnsupportedBytecodeVersion"/>
    public bool IsUnsupportedBytecodeVersion { get; set; }

    public required GameInfoVersion Version { get; set; }

    /// <seealso cref="UndertaleGeneralInfo.BytecodeVersion"/>
    public int BytecodeVersion { get; set; }

    /// <seealso cref="UndertaleGeneralInfo.Config"/>
    public string? ConfigurationName { get; set; }

    public required GameInfoItemCounts ItemCounts { get; set; }

    /// <summary>
    /// Version of UndertaleModLib, though technically, it's not game info
    /// </summary>
    public required string UMTLibVersion { get; set; }
}

public record GameInfoVersion
{
    /// <seealso cref="UndertaleGeneralInfo.Major"/>
    public uint Major { get; set; }

    /// <seealso cref="UndertaleGeneralInfo.Minor"/>
    public uint Minor { get; set; }

    /// <seealso cref="UndertaleGeneralInfo.Release"/>
    public uint Release { get; set; }

    /// <seealso cref="UndertaleGeneralInfo.Build"/>
    public uint Build { get; set; }
}

public record GameInfoItemCounts
{
    /// <seealso cref="UndertaleData.Sprites"/>
    public int Sprites { get; set; }

    /// <seealso cref="UndertaleData.Sounds"/>
    public int Sounds { get; set; }

    /// <seealso cref="UndertaleData.AudioGroups"/>
    public int AudioGroups { get; set; }

    /// <seealso cref="UndertaleData.Backgrounds"/>
    public int Backgrounds { get; set; }

    /// <seealso cref="UndertaleData.Paths"/>
    public int Paths { get; set; }

    /// <seealso cref="UndertaleData.Scripts"/>
    public int Scripts { get; set; }

    /// <seealso cref="UndertaleData.Shaders"/>
    public int Shaders { get; set; }

    /// <seealso cref="UndertaleData.Fonts"/>
    public int Fonts { get; set; }

    /// <seealso cref="UndertaleData.Timelines"/>
    public int Timelines { get; set; }

    /// <seealso cref="UndertaleData.GameObjects"/>
    public int GameObjects { get; set; }

    /// <seealso cref="UndertaleData.Rooms"/>
    public int Rooms { get; set; }

    /// <seealso cref="UndertaleData.Extensions"/>
    public int Extensions { get; set; }

    /// <seealso cref="UndertaleData.TexturePageItems"/>
    public int TexturePageItems { get; set; }

    /// <seealso cref="UndertaleData.TextureGroupInfo"/>
    public int TextureGroupInfo { get; set; }

    /// <seealso cref="UndertaleData.Code"/>
    public int Code { get; set; }

    /// <seealso cref="UndertaleData.Variables"/>
    public int Variables { get; set; }

    /// <seealso cref="UndertaleData.Functions"/>
    public int Functions { get; set; }

    /// <seealso cref="UndertaleData.CodeLocals"/>
    public int CodeLocals { get; set; }

    /// <seealso cref="UndertaleData.Strings"/>
    public int Strings { get; set; }

    /// <seealso cref="UndertaleData.GlobalInitScripts"/>
    public int GlobalInitScripts { get; set; }

    /// <seealso cref="UndertaleData.EmbeddedTextures"/>
    public int EmbeddedTextures { get; set; }

    /// <seealso cref="UndertaleData.EmbeddedImages"/>
    public int EmbeddedImages { get; set; }

    /// <seealso cref="UndertaleData.EmbeddedAudio"/>
    public int EmbeddedAudio { get; set; }

    /// <seealso cref="UndertaleData.ParticleSystems"/>
    public int ParticleSystems { get; set; }

    /// <seealso cref="UndertaleData.ParticleSystemEmitters"/>
    public int ParticleSystemEmitters { get; set; }
}

[JsonSerializable(typeof(GameInfo))]
internal partial class GameInfoContext : JsonSerializerContext { }
