using System.Text.Json.Serialization;

namespace Serializers
{
    /// <summary>
    /// Info about <see cref="UndertaleModLib.Models.UndertaleCode"/>
    /// Keep this in sync with <c>web/src/messages/getCodeInfoByName.ts</c>
    /// </summary>
    public record CodeInfo
    {
        public string? DecompiledCode { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleCode.ParentEntry"/>
        public string? ParentEntryName { get; set; }
    }

    [JsonSerializable(typeof(CodeInfo))]
    internal partial class GetCodeInfoByNameContext : JsonSerializerContext { }
}
