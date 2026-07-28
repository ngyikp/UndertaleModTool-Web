using System.Text.Json.Serialization;
using UndertaleModLib.Models;
using UndertaleModLib.Util;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Info about <see cref="UndertaleEmbeddedTexture"/>
/// Keep this in sync with <c>web/src/messages/getEmbeddedTextureInfoById.ts</c>
/// </summary>
public record EmbeddedTextureInfo
{
    /// <summary>
    /// The <see cref="UndertaleEmbeddedTexture.TextureData"/>
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
    /// <seealso cref="GMImage.ConvertToRawBgra"/>
    public byte[]? Bgra { get; set; }

    /// <seealso cref="GMImage.ImageFormat"/>
    [JsonConverter(typeof(JsonStringEnumConverter<GMImage.ImageFormat>))]
    public GMImage.ImageFormat Format { get; set; }

    /// <seealso cref="GMImage.Width"/>
    public required int Width { get; set; }

    /// <seealso cref="GMImage.Height"/>
    public required int Height { get; set; }
}

[JsonSerializable(typeof(EmbeddedTextureInfo))]
internal partial class EmbeddedTextureInfoContext : JsonSerializerContext { }
