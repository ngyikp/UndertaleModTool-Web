using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using System.Text.Json;
using Serializers;
using UndertaleModLib;
using UndertaleModLib.Decompiler;
using UndertaleModLib.Models;

return;

public partial class UndertaleModToolWASM
{
    private static void WarningHandler(string warning, bool isImportant) => Console.WriteLine($"[WARNING]: {warning}");
    private static void MessageHandler(string message) => Console.WriteLine($"[MESSAGE]: {message}");

    [JSExport]
    [SupportedOSPlatform("browser")]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(Underanalyzer.Decompiler.GameSpecific.GameSpecificRegistry))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(GameSpecificResolver.GameSpecificDefinition))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(Underanalyzer.Decompiler.GameSpecific.EnumMacroType))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(Underanalyzer.Decompiler.GameSpecific.ConstantsMacroType))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.PublicProperties, typeof(UndertaleData))]
    // UnserializeChildObjectCount
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleObject))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSimpleListString))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleAnimationCurve.Channel))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleAnimationCurve))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleCode))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleCodeLocals))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleEmbeddedTexture))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleExtension))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleExtensionFile))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleExtensionFunction))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleFeatureFlags))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleFont.Glyph))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleFont))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleGameObject.Event))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleGameObject))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleGeneralInfo))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleInstruction))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleOptions))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleParticleSystem))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertalePath))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.Layer.LayerAssetsData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.Layer.LayerBackgroundData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.Layer.LayerEffectData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.Layer.LayerInstancesData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.Layer.LayerTilesData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.Layer))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.ParticleSystemInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.TextItemInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.AudioKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.BroadcastMessage))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.CurveData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.IntData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.IntKeyframes))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.Moment))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.RealData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.RealKeyframes))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.TextKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.Track))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.TrackKeyframes<>))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleShader))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSound))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSpineTextureEntry))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSprite))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleTags))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, "UndertaleModLib.Models.UndertaleTags.TempAssetTags", "UndertaleModLib")]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleTextureGroupInfo))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleTimeline))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleUIEffectLayer))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleUIFlexPanel))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleUIGameObject))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleUILayer))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleUINode))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleUISequenceInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleUISpriteInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleUITextItemInstance))]
    // ChildObjectCount
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleGameObject.EventAction))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.Background))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.View))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.GameObject))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.Tile))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.SpriteInstance))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.SequenceInstance))]
    // ChildObjectsSize
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleAudioGroup))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleEmbeddedImage))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleExtensionFunctionArg))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleExtensionOption))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleFilterEffect))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleFont.Glyph.GlyphKerning))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleFunction))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleCodeLocals.LocalVar))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleGameObject.UndertalePhysicsVertex))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleOptions.Constant))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleParticleSystemEmitter))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertalePath.PathPoint))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleRoom.EffectProperty))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleScript))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.SimpleIntData))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.SpriteFramesKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.BoolKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSequence.StringKeyframes.Data))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleShader.VertexShaderAttribute))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSprite.TextureEntry))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleSprite.NineSlice))]
    [DynamicDependency(DynamicallyAccessedMemberTypes.All, typeof(UndertaleTexturePageItem))]
    public static string ReadFile(string fileName)
    {
        FileStream fs = new FileStream(fileName, FileMode.Open);

        UndertaleData gameData = UndertaleIO.Read(fs, WarningHandler, MessageHandler);
        DataHolder.SetData(gameData);

        return JsonSerializer.Serialize(GetGameInfo(gameData), GameInfoContext.Default.GameInfo);
    }

    // Same info as UndertaleModCli.Program.CliQuickInfo
    private static GameInfo GetGameInfo(UndertaleData Data)
    {
        return new()
        {
            ProjectName = Data.GeneralInfo.Name.Content,
            DisplayName = Data.GeneralInfo.DisplayName.Content,
            IsGameMaker2 = Data.IsGameMaker2(),
            IsYYC = Data.IsYYC(),
            IsDebuggerDisabled = Data.GeneralInfo.IsDebuggerDisabled,
            Version = new()
            {
                Major = Data.GeneralInfo.Major,
                Minor = Data.GeneralInfo.Minor,
                Release = Data.GeneralInfo.Release,
                Build = Data.GeneralInfo.Build,
            },

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
                TextureGroupInfo = Data.TextureGroupInfo?.Count ?? 0, // some old games don't have this

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

    /// <param name="modelTypeInt">Value in <see cref="ModelType" />, needs to be int due to SYSLIB1072</param>
    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string GetEntriesByModelType(int modelTypeInt)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        ModelType modelType = Enum.Parse<ModelType>(modelTypeInt.ToString());

        IEnumerable<UndertaleResource> model;
        switch (modelType)
        {
            case ModelType.Sprites:
                model = gameData.Sprites;
                break;

            case ModelType.Sounds:
                model = gameData.Sounds;
                break;

            case ModelType.Backgrounds:
                model = gameData.Backgrounds;
                break;

            case ModelType.Paths:
                model = gameData.Paths;
                break;

            case ModelType.Scripts:
                model = gameData.Scripts;
                break;

            case ModelType.Shaders:
                model = gameData.Shaders;
                break;

            case ModelType.Fonts:
                model = gameData.Fonts;
                break;

            case ModelType.Timelines:
                model = gameData.Timelines;
                break;

            case ModelType.GameObjects:
                model = gameData.GameObjects;
                break;

            case ModelType.Rooms:
                model = gameData.Rooms;
                break;

            case ModelType.Extensions:
                model = gameData.Extensions;
                break;

            case ModelType.TexturePageItems:
                model = gameData.TexturePageItems;
                break;

            case ModelType.TextureGroupInfo:
                model = gameData.TextureGroupInfo;
                break;

            case ModelType.Strings:
                model = gameData.Strings;
                break;

            case ModelType.EmbeddedTextures:
                model = gameData.EmbeddedTextures;
                break;

            case ModelType.Code:
                model = gameData.Code;
                break;

            case ModelType.Variables:
                model = gameData.Variables;
                break;

            default:
                throw new NotImplementedException($"Model type {modelType} is not implemented");
        }

        List<string> entries = [];
        if (model is not null)
        {
            foreach (var entry in model)
            {
                if (entry is not null)
                {
                    if (entry is UndertaleNamedResource namedEntry)
                    {
                        entries.Add(namedEntry.Name.Content);
                    }
                    else if (entry is Underanalyzer.IGMString gmStringEntry)
                    {
                        // UndertaleString goes here
                        entries.Add(gmStringEntry.Content);
                    }
                    else
                    {
                        throw new NotImplementedException($"Model type {modelType} does not have a valid name implementation");
                    }
                }
            }
        }

        return JsonSerializer.Serialize(entries, ItemListJsonContext.Default.ListString);
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string GetCodeInfoByName(string name)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        UndertaleCode code = gameData.Code.First(code => name == code.Name.Content);

        CodeInfo codeInfo = new();

        if (code.ParentEntry != null)
        {
            codeInfo.ParentEntryName = code.ParentEntry.Name.Content;
        }
        else
        {
            // try
            // {
            // mainWindow.Project.TryGetCodeSource(code, out decompiled)
            codeInfo.DecompiledCode = new Underanalyzer.Decompiler.DecompileContext(new GlobalDecompileContext(gameData), code, gameData.ToolInfo.DecompilerSettings).DecompileToString();
            // }
            // catch (Exception e)
            // {
            //     decompiled = "/*\nDECOMPILER FAILED!\n\n" + e.ToString() + "\n*/";
            // }            
        }

        return JsonSerializer.Serialize(codeInfo, GetCodeInfoByNameContext.Default.CodeInfo);
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static byte[] GetSoundDataByName(string name)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        UndertaleSound sound = gameData.Sounds.First(sound => name == sound.Name.Content);
        UndertaleEmbeddedAudio? target = null;
        if (sound.AudioFile is not null)
        {
            target = sound.AudioFile;
        }

        if (target is null)
        {
            if (!sound.Flags.HasFlag(UndertaleSound.AudioEntryFlags.IsEmbedded))
            {
                throw new Exception("This audio file is not embedded in the game data file.");
            }
            else
            {
                throw new Exception("Cannot find audio file.");
            }
        }

        return target.Data;
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static byte[] GetEmbeddedTextureImageById(int id)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        UndertaleEmbeddedTexture texture = gameData.EmbeddedTextures[id];

        MemoryStream stream = new();
        BinaryWriter writer = new(stream);
        texture.TextureData.Image.WriteToBinaryWriter(writer, gameData.IsVersionAtLeast(2022, 5));

        return stream.ToArray();
    }
}
