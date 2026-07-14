
using System.Text.Json.Serialization;

namespace Serializers
{
    public class GameInfo
    {
        public string? ProjectName { get; set; }
        public bool IsGameMaker2 { get; set; }
        public bool IsYYC { get; set; }
        public int BytecodeVersion { get; set; }
        public string? ConfigurationName { get; set; }
        public GameInfoItemCounts? ItemCounts { get; set; }
    }

    public class GameInfoItemCounts
    {
        public int Sounds { get; set; }
        public int Sprites { get; set; }
        public int Backgrounds { get; set; }
        public int Paths { get; set; }
        public int Scripts { get; set; }
        public int Shaders { get; set; }
        public int Fonts { get; set; }
        public int Timelines { get; set; }
        public int GameObjects { get; set; }
        public int Rooms { get; set; }
        public int Extensions { get; set; }
        public int TexturePageItems { get; set; }

        public int Code { get; set; }
        public int Variables { get; set; }
        public int Functions { get; set; }
        public int CodeLocals { get; set; }

        public int Strings { get; set; }
        public int EmbeddedTextures { get; set; }
        public int EmbeddedAudio { get; set; }
    }

    [JsonSerializable(typeof(GameInfo))]
    internal partial class GameInfoContext : JsonSerializerContext { }
}
