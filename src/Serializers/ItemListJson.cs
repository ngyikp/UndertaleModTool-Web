using System.Text.Json.Serialization;

namespace Serializers
{
    [JsonSerializable(typeof(List<string>))]
    internal partial class ItemListJsonContext : JsonSerializerContext { }
}
