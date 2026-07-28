using System.Text.Json.Serialization;

namespace UndertaleModToolWASM.Serializers;

[JsonSerializable(typeof(List<string>))]
internal partial class ItemListJsonContext : JsonSerializerContext { }
