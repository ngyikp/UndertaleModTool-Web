using System.Text.Json.Serialization;

namespace Serializers
{
    /// <summary>
    /// Info about <see cref="UndertaleModLib.Models.UndertaleTexturePageItem"/>
    /// Keep this in sync with <c>web/src/messages/getTexturePageInfoById.ts</c>
    /// </summary>
    public record TexturePageInfo
    {
        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.TexturePage"/>
        public int EmbeddedTextureID { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.SourceX"/>
        public ushort SourceX { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.SourceY"/>
        public ushort SourceY { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.SourceWidth"/>
        public ushort SourceWidth { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.SourceHeight"/>
        public ushort SourceHeight { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.TargetX"/>
        public ushort TargetX { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.TargetY"/>
        public ushort TargetY { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.TargetWidth"/>
        public ushort TargetWidth { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.TargetHeight"/>
        public ushort TargetHeight { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.BoundingWidth"/>
        public ushort BoundingWidth { get; set; }

        /// <seealso cref="UndertaleModLib.Models.UndertaleTexturePageItem.BoundingHeight"/>
        public ushort BoundingHeight { get; set; }
    }

    [JsonSerializable(typeof(TexturePageInfo))]
    internal partial class TexturePageInfoContext : JsonSerializerContext { }
}
