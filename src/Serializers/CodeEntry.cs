using System.Text.Json.Serialization;
using UndertaleModLib.Models;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Keep this in sync with <c>web/src/messages/listCodeEntries.ts</c>
/// </summary>
public record CodeEntry
{
    public required string Name { get; set; }

    /// <seealso cref="UndertaleCode.ParentEntry"/>
    public bool HasParentEntry { get; set; }
}

[JsonSerializable(typeof(List<CodeEntry>))]
internal partial class CodeEntryListContext : JsonSerializerContext { }
