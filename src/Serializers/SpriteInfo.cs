using System.Text.Json.Serialization;
using UndertaleModLib.Models;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Info about <see cref="UndertaleSprite"/>
/// Keep this in sync with <c>web/src/messages/getSpriteInfoByName.ts</c>
/// </summary>
public record SpriteInfo
{
    /// <summary>
    /// Index of the sprite in <see cref="UndertaleData"/>.
    /// </summary>
    public required int Id { get; set; }

    /// <seealso cref="UndertaleSprite.Textures"/>
    public required int[] TexturePageIDs { get; set; }
}

[JsonSerializable(typeof(SpriteInfo))]
internal partial class SpriteInfoContext : JsonSerializerContext { }
