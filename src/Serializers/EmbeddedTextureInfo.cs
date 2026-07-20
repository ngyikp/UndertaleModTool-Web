using System.Text.Json.Serialization;
using UndertaleModLib.Util;

namespace Serializers
{
    /// <summary>
    /// Info about <see cref="UndertaleModLib.Models.UndertaleEmbeddedTexture"/>
    /// Keep this in sync with <c>web/src/messages/getEmbeddedTextureInfoById.ts</c>
    /// </summary>
    public record EmbeddedTextureInfo
    {
        /// <seealso cref="UndertaleModLib.Models.UndertaleEmbeddedTexture.TextureData"/>
        public required byte[] FileContents { get; set; }

        /// <seealso cref="UndertaleModLib.Util.GMImage.ImageFormat"/>
        [JsonConverter(typeof(JsonStringEnumConverter<GMImage.ImageFormat>))]
        public GMImage.ImageFormat Format { get; set; }
    }

    [JsonSerializable(typeof(EmbeddedTextureInfo))]
    internal partial class EmbeddedTextureInfoContext : JsonSerializerContext { }
}
