using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using System.Text.Json;
using UndertaleModLib;

return;

public partial class UndertaleModToolWASM
{
    static UndertaleData? Data;

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
        Data = UndertaleIO.Read(fs, WarningHandler, MessageHandler);

        return JsonSerializer.Serialize(GetGameInfo(Data), GameInfoContext.Default.GameInfo);
    }

    // Same info as UndertaleModCli.Program.CliQuickInfo
    private static GameInfo GetGameInfo(UndertaleData Data)
    {
        return new()
        {
            ProjectName = Data.GeneralInfo.Name.Content,
            IsGameMaker2 = Data.IsGameMaker2(),
            IsYYC = Data.IsYYC(),
            BytecodeVersion = Data.GeneralInfo.BytecodeVersion,
            ConfigurationName = Data.GeneralInfo.Config.Content,
            ItemCounts = new()
            {
                Sounds = Data.Sounds.Count,
                Sprites = Data.Sprites.Count,
                Backgrounds = Data.Backgrounds.Count,
                Paths = Data.Paths.Count,
                Scripts = Data.Scripts.Count,
                Shaders = Data.Shaders.Count,
                Fonts = Data.Fonts.Count,
                Timelines = Data.Timelines.Count,
                GameObjects = Data.GameObjects.Count,
                Rooms = Data.Rooms.Count,
                Extensions = Data.Extensions.Count,
                TexturePageItems = Data.TexturePageItems.Count,

                // could be null if YYC
                Code = Data.Code?.Count ?? 0,
                Variables = Data.Variables?.Count ?? 0,
                Functions = Data.Functions?.Count ?? 0,
                CodeLocals = Data.CodeLocals?.Count ?? 0, // some old games don't have this

                Strings = Data.Strings.Count,
                EmbeddedTextures = Data.EmbeddedTextures.Count,
                EmbeddedAudio = Data.EmbeddedAudio.Count,
            }
        };
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string GetCodeList()
    {
        UndertaleData data = EnsureDataLoaded();

        string[] list = data.Code.Select(code => code.Name.Content).ToArray();

        return JsonSerializer.Serialize(list, ItemListJsonContext.Default.StringArray);
    }

    private static UndertaleData EnsureDataLoaded()
    {
        if (Data is null)
        {
            throw new Exception("No data file is currently loaded.");
        }

        return Data;
    }
}
