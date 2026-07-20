using System.Text.Json.Serialization;
using static UndertaleModLib.Models.UndertaleSound;

namespace Serializers
{
    /// <summary>
    /// Info about <see cref="UndertaleModLib.Models.UndertaleSound"/>
    /// Keep this in sync with <c>web/src/messages/getSoundInfoByName.ts</c>
    /// </summary>
    public record SoundInfo
    {
        public byte[]? FileContents { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleSound.Flags"/>
        public AudioEntryFlags Flags { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleSound.File"/>
        public required string ExternalFileName { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleSound.GroupID"/>
        public int AudioGroupID { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleSound.AudioGroup"/>
        public required string AudioGroupName { get; set; }
    }

    [JsonSerializable(typeof(SoundInfo))]
    internal partial class GetSoundInfoByNameContext : JsonSerializerContext { }
}
