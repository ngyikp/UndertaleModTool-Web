
using System.Text.Json.Serialization;

namespace Serializers
{
    /// <summary>
    /// General info of the game. Keep this in sync with <c>web/src/types/GameInfoType.ts</c>
    /// </summary>
    public record GameInfo
    {
        /// <seealso cref="UndertaleModLib.Models.UndertaleGeneralInfo.Name"/>
        public string? ProjectName { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleGeneralInfo.DisplayName"/>
        public string? DisplayName { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.IsGameMaker2()"/>
        public bool IsGameMaker2 { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.IsYYC()"/>
        public bool IsYYC { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleGeneralInfo.IsDebuggerDisabled"/>
        public bool IsDebuggerDisabled { get; set; }

        public required GameInfoVersion Version { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleGeneralInfo.BytecodeVersion"/>
        public int BytecodeVersion { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleGeneralInfo.Config"/>
        public string? ConfigurationName { get; set; }

        public required GameInfoItemCounts ItemCounts { get; set; }
    }

    public record GameInfoVersion
    {
        /// <seealso cref="UndertaleModLib.Models.UndertaleGeneralInfo.Major"/>
        public uint Major { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleGeneralInfo.Minor"/>
        public uint Minor { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleGeneralInfo.Release"/>
        public uint Release { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleGeneralInfo.Build"/>
        public uint Build { get; set; }
    }

    public record GameInfoItemCounts
    {
        /// <seealso cref="UndertaleModLib.UndertaleData.Sprites"/>
        public int Sprites { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Sounds"/>
        public int Sounds { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.AudioGroups"/>
        public int AudioGroups { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Backgrounds"/>
        public int Backgrounds { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Paths"/>
        public int Paths { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Scripts"/>
        public int Scripts { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Shaders"/>
        public int Shaders { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Fonts"/>
        public int Fonts { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Timelines"/>
        public int Timelines { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.GameObjects"/>
        public int GameObjects { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Rooms"/>
        public int Rooms { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Extensions"/>
        public int Extensions { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.TexturePageItems"/>
        public int TexturePageItems { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.TextureGroupInfo"/>
        public int TextureGroupInfo { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Code"/>
        public int Code { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Variables"/>
        public int Variables { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Functions"/>
        public int Functions { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.CodeLocals"/>
        public int CodeLocals { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.Strings"/>
        public int Strings { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.EmbeddedTextures"/>
        public int EmbeddedTextures { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.EmbeddedImages"/>
        public int EmbeddedImages { get; set; }

        /// <seealso cref="UndertaleModLib.UndertaleData.EmbeddedAudio"/>
        public int EmbeddedAudio { get; set; }
    }

    [JsonSerializable(typeof(GameInfo))]
    internal partial class GameInfoContext : JsonSerializerContext { }
}
