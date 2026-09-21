using System.Text.Json.Serialization;
using UndertaleModLib.Models;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Info about <see cref="UndertaleExtension"/>
/// Keep this in sync with <c>web/src/messages/getExtensionInfoByName.ts</c>
/// </summary>
public record ExtensionInfo
{
    /// <summary>
    /// Index of the extension in <see cref="UndertaleData"/>.
    /// </summary>
    public required int Id { get; set; }

    /// <seealso cref="UndertaleExtension.Version"/>
    public required string? Version { get; set; }

    /// <seealso cref="UndertaleExtension.Files"/>
    public required IList<string> FileNames { get; set; }

    /// <seealso cref="UndertaleExtension.Options"/>
    public required IList<ExtensionOption> Options { get; set; }
}

public record ExtensionOption
{
    /// <seealso cref="UndertaleExtensionOption.Name"/>
    public required string Name { get; set; }
    
    /// <seealso cref="UndertaleExtensionOption.Value"/>
    public required string Value { get; set; }
    
    /// <seealso cref="UndertaleExtensionOption.Kind"/>
    public required UndertaleExtensionOption.OptionKind Kind { get; set; }
}

[JsonSerializable(typeof(ExtensionInfo))]
internal partial class ExtensionInfoContext : JsonSerializerContext { }
