using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using UndertaleModLib;

return;

public partial class UndertaleModToolWASM
{
    private static void WarningHandler(string warning, bool isImportant) => Console.WriteLine($"[WARNING]: {warning}");
    private static void MessageHandler(string message) => Console.WriteLine($"[MESSAGE]: {message}");

    [JSExport]
    [SupportedOSPlatform("browser")]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(Underanalyzer.Decompiler.GameSpecific.GameSpecificRegistry))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Decompiler.GameSpecificResolver.GameSpecificDefinition))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(Underanalyzer.Decompiler.GameSpecific.EnumMacroType))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(Underanalyzer.Decompiler.GameSpecific.ConstantsMacroType))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.PublicProperties, typeof(UndertaleData))]
    // UnserializeChildObjectCount
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleObject))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSimpleListString))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleAnimationCurve.Channel))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleAnimationCurve))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleCode))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleCodeLocals))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleEmbeddedTexture))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleExtension))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleExtensionFile))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleExtensionFunction))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleFeatureFlags))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleFont.Glyph))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleFont))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleGameObject.Event))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleGameObject))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleGeneralInfo))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleInstruction))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleOptions))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleParticleSystem))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertalePath))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.Layer.LayerAssetsData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.Layer.LayerBackgroundData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.Layer.LayerEffectData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.Layer.LayerInstancesData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.Layer.LayerTilesData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.Layer))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.ParticleSystemInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.TextItemInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.AudioKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.BroadcastMessage))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.CurveData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.IntData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.IntKeyframes))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.Moment))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.RealData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.RealKeyframes))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.TextKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.Track))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.TrackKeyframes<>))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleShader))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSound))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSpineTextureEntry))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSprite))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleTags))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, "UndertaleModLib.Models.UndertaleTags.TempAssetTags", "UndertaleModLib")]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleTextureGroupInfo))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleTimeline))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleUIEffectLayer))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleUIFlexPanel))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleUIGameObject))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleUILayer))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleUINode))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleUISequenceInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleUISpriteInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleUITextItemInstance))]
    // ChildObjectCount
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleGameObject.EventAction))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.Background))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.View))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.GameObject))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.Tile))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.SpriteInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.SequenceInstance))]
    // ChildObjectsSize
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleAudioGroup))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleEmbeddedImage))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleExtensionFunctionArg))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleExtensionOption))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleFilterEffect))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleFont.Glyph.GlyphKerning))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleFunction))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleCodeLocals.LocalVar))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleGameObject.UndertalePhysicsVertex))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleOptions.Constant))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleParticleSystemEmitter))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertalePath.PathPoint))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleRoom.EffectProperty))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleScript))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.SimpleIntData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.SpriteFramesKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.BoolKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSequence.StringKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleShader.VertexShaderAttribute))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSprite.TextureEntry))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleSprite.NineSlice))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleModLib.Models.UndertaleTexturePageItem))]
    public static string ReadFile(string fileName)
    {
        FileStream fs = new FileStream(fileName, FileMode.Open);
        UndertaleData gmData = UndertaleIO.Read(fs, WarningHandler, MessageHandler);
        return CliQuickInfo(gmData);
    }

    // From UndertaleModCli.Program.CliQuickInfo
    private static string CliQuickInfo(UndertaleData Data)
    {
        string info = "";
        info += string.Format("Quick Information:") + "\n";
        info += string.Format("Project Name - {0}", Data.GeneralInfo.Name) + "\n";
        info += string.Format("Is GMS2 - {0}", Data.IsGameMaker2()) + "\n";
        info += string.Format("Is YYC - {0}", Data.IsYYC()) + "\n";
        info += string.Format("Bytecode version - {0}", Data.GeneralInfo.BytecodeVersion) + "\n";
        info += string.Format("Configuration name - {0}", Data.GeneralInfo.Config) + "\n";

        info += string.Format($"{Data.Sounds.Count} Sounds, {Data.Sprites.Count} Sprites, {Data.Backgrounds.Count} Backgrounds") + "\n";
        info += string.Format($"{Data.Paths.Count} Paths, {Data.Scripts.Count} Scripts, {Data.Shaders.Count} Shaders") + "\n";
        info += string.Format($"{Data.Fonts.Count} Fonts, {Data.Timelines.Count} Timelines, {Data.GameObjects.Count} Game Objects") + "\n";
        info += string.Format($"{Data.Rooms.Count} Rooms, {Data.Extensions.Count} Extensions, {Data.TexturePageItems.Count} Texture Page Items") + "\n";
        if (!Data.IsYYC())
        {
            info += string.Format($"{Data.Code.Count} Code Entries, {Data.Variables.Count} Variables, {Data.Functions.Count} Functions") + "\n";
            var codeLocalsInfo = Data.CodeLocals is not null ? $"{Data.CodeLocals.Count} Code locals, " : "";
            info += string.Format($"{codeLocalsInfo}{Data.Strings.Count} Strings, {Data.EmbeddedTextures.Count} Embedded Textures") + "\n";
        }
        else
        {
            info += string.Format("Unknown amount of Code entries and Code locals") + "\n";
        }

        info += string.Format($"{Data.Strings.Count} Strings") + "\n";
        info += string.Format($"{Data.EmbeddedTextures.Count} Embedded Textures") + "\n";
        info += string.Format($"{Data.EmbeddedAudio.Count} Embedded Audio") + "\n";

        return info;
    }
}
