using System.Text.Json.Serialization;

[JsonSerializable(typeof(string[]))]
internal partial class ItemListJsonContext : JsonSerializerContext { }
