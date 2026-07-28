using System.Text.Json.Serialization;
using UndertaleModLib.Models;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Info about <see cref="UndertaleTexturePageItem"/>
/// Keep this in sync with <c>web/src/messages/getTexturePageInfoById.ts</c>
/// </summary>
public record TexturePageInfo
{
    /// <seealso cref="UndertaleTexturePageItem.TexturePage"/>
    public int EmbeddedTextureID { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.SourceX"/>
    public ushort SourceX { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.SourceY"/>
    public ushort SourceY { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.SourceWidth"/>
    public ushort SourceWidth { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.SourceHeight"/>
    public ushort SourceHeight { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.TargetX"/>
    public ushort TargetX { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.TargetY"/>
    public ushort TargetY { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.TargetWidth"/>
    public ushort TargetWidth { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.TargetHeight"/>
    public ushort TargetHeight { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.BoundingWidth"/>
    public ushort BoundingWidth { get; set; }

    /// <seealso cref="UndertaleTexturePageItem.BoundingHeight"/>
    public ushort BoundingHeight { get; set; }
}

[JsonSerializable(typeof(TexturePageInfo))]
internal partial class TexturePageInfoContext : JsonSerializerContext { }
