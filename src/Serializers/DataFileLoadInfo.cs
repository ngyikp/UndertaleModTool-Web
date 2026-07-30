using System.Text.Json.Serialization;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Information about the loaded data file, such as any warnings.
/// Keep this in sync with <c>web/src/messages/readFile.ts</c>
/// </summary>
public record DataFileLoadInfo
{
    public bool Successful { get; set; }

    public bool HadImportantWarnings { get; set; }

    public required List<string> Warnings { get; set; }

    /// <summary>
    /// Version of UndertaleModLib
    /// </summary>
    public required string UMTLibVersion { get; set; }
}

[JsonSerializable(typeof(DataFileLoadInfo))]
internal partial class DataFileLoadInfoContext : JsonSerializerContext { }
