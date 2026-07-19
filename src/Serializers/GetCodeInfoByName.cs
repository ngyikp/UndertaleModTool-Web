using System.Text.Json.Serialization;

namespace Serializers
{
    public record CodeInfo
    {
        public string? DecompiledCode { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleCode.ParentEntry"/>
        public string? ParentEntryName { get; set; }
    }

    [JsonSerializable(typeof(CodeInfo))]
    internal partial class GetCodeInfoByNameContext : JsonSerializerContext { }
}
