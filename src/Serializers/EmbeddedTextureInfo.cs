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
        /// <summary>
        /// The <see cref="UndertaleModLib.Models.UndertaleEmbeddedTexture.TextureData"/>
        /// if the <see cref="Format"/> is <see cref="GMImage.ImageFormat.Png"/> 
        /// or <see cref="GMImage.ImageFormat.Dds"/>.
        /// 
        /// Windows version of UMT only imports/exports PNG hiding file format
        /// complexities, so it seems fine to only allow downloads of certain
        /// formats for performance.
        /// </summary>
        public byte[]? DownloadableFileContents { get; set; }
        
        /// <summary>
        /// The image as <see cref="GMImage.ImageFormat.RawBgra"/> for
        /// non-PNG and non-DDS.
        /// </summary>
        /// <seealso cref="UndertaleModLib.Util.GMImage.ConvertToRawBgra"/>
        public byte[]? Bgra { get; set; }

        /// <seealso cref="UndertaleModLib.Util.GMImage.ImageFormat"/>
        [JsonConverter(typeof(JsonStringEnumConverter<GMImage.ImageFormat>))]
        public GMImage.ImageFormat Format { get; set; }

        /// <seealso cref="UndertaleModLib.Util.GMImage.Width"/>
        public required int Width { get; set; }

        /// <seealso cref="UndertaleModLib.Util.GMImage.Height"/>
        public required int Height { get; set; }
    }

    [JsonSerializable(typeof(EmbeddedTextureInfo))]
    internal partial class EmbeddedTextureInfoContext : JsonSerializerContext { }
}
