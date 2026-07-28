using System.Text.Json.Serialization;
using UndertaleModLib.Models;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Info about <see cref="UndertaleCode"/>
/// Keep this in sync with <c>web/src/messages/getCodeInfoByName.ts</c>
/// </summary>
public record CodeInfo
{
    public string? DecompiledCode { get; set; }

    /// <seealso cref="UndertaleCode.ParentEntry"/>
    public string? ParentEntryName { get; set; }
}

[JsonSerializable(typeof(CodeInfo))]
internal partial class CodeInfoContext : JsonSerializerContext { }
