using System.Text.Json.Serialization;

namespace Serializers
{
    [JsonSerializable(typeof(string))]
    internal partial class GetCodeByNameContext : JsonSerializerContext { }
}
