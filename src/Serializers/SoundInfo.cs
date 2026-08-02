using System.Text.Json.Serialization;
using UndertaleModLib.Models;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Info about <see cref="UndertaleSound"/>
/// Keep this in sync with <c>web/src/messages/getSoundInfoByName.ts</c>
/// </summary>
public record SoundInfo
{
    /// <seealso cref="UndertaleSound.AudioFile"/>
    public byte[]? FileContents { get; set; }

    /// <seealso cref="UndertaleSound.Flags"/>
    public UndertaleSound.AudioEntryFlags Flags { get; set; }

    /// <seealso cref="UndertaleSound.File"/>
    public required string ExternalFileName { get; set; }

    /// <seealso cref="UndertaleSound.GroupID"/>
    public int AudioGroupID { get; set; }

    /// <seealso cref="UndertaleSound.AudioGroup"/>
    public required string AudioGroupName { get; set; }
}

[JsonSerializable(typeof(SoundInfo))]
internal partial class SoundInfoContext : JsonSerializerContext { }
