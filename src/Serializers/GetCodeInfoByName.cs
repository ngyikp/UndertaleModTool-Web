using System.Text.Json.Serialization;

namespace Serializers
{
    public record CodeInfo
    {
        public string? DecompiledCode { get; set; }
        public string? ParentEntryName { get; set; }
    }

    [JsonSerializable(typeof(CodeInfo))]
    internal partial class GetCodeInfoByNameContext : JsonSerializerContext { }
}
