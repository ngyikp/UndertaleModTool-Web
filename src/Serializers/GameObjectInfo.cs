using System.Text.Json.Serialization;
using UndertaleModLib.Models;

namespace UndertaleModToolWASM.Serializers;

/// <summary>
/// Info about <see cref="UndertaleGameObject"/>
/// Keep this in sync with <c>web/src/messages/getGameObjectInfoByName.ts</c>
/// </summary>
public record GameObjectInfo
{
    /// <summary>
    /// Index of the object in <see cref="UndertaleData"/>.
    /// </summary>
    public required int Id { get; set; }

    /// <seealso cref="UndertaleGameObject.Sprite"/>
    public required string? SpriteName { get; set; }
    
    /// <seealso cref="UndertaleGameObject.Visible"/>
    public bool Visible { get; set; }
    
    /// <seealso cref="UndertaleGameObject.Persistent"/>
    public bool Persistent { get; set; }
    
    /// <seealso cref="UndertaleGameObject.ParentId"/>
    public required string? ParentGameObjectName { get; set; }
    
    /// <remarks>Dictionary key is EventType</remarks>
    /// <seealso cref="UndertaleGameObject.Events"/>
    public required Dictionary<int, List<GameObjectEvent>> Events { get; set; }
}

public record GameObjectEvent
{
    /// <seealso cref="UndertaleGameObject.Event.Actions"/>
    /// <seealso cref="UndertaleGameObject.EventAction.CodeId"/>
    public required List<string?> ActionsCodeNames { get; set; }
    
    /// <seealso cref="UndertaleGameObject.Event.EventSubtype"/>
    public uint EventSubtype { get; set; }
}

[JsonSerializable(typeof(GameObjectInfo))]
internal partial class GameObjectInfoContext : JsonSerializerContext { }
