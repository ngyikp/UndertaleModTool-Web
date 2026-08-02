using System.Text.Json.Serialization;
using UndertaleModLib.Models;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Info about <see cref="UndertaleEmbeddedAudio"/>
/// Keep this in sync with <c>web/src/messages/getEmbeddedAudioInfoById.ts</c>
/// </summary>
public record EmbeddedAudioInfo
{
    /// <seealso cref="UndertaleEmbeddedAudio.Data"/>
    public required byte[] FileContents { get; set; }
}

[JsonSerializable(typeof(EmbeddedAudioInfo))]
internal partial class EmbeddedAudioInfoContext : JsonSerializerContext { }
