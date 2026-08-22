using System.Diagnostics.CodeAnalysis;
using System.IO.Compression;
using System.Reflection;
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using System.Text.Json;
using UndertaleModLib;
using UndertaleModLib.Compiler;
using UndertaleModLib.Decompiler;
using UndertaleModLib.Models;
using UndertaleModLib.Util;
using UndertaleModToolWASM.Serializers;

namespace UndertaleModToolWASM;

public partial class Program
{
    public static void Main()
    {
    }

    [JSImport("globalThis.receiveMessageFromDotNet")]
    public static partial void SendMessageToWorker(int messageId, string text);

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
    public static string ReadFile(int messageId, string fileName)
    {
        bool hadImportantWarnings = false;
        List<string> warnings = [];

        UndertaleData gameData;
        try
        {
            using FileStream fs = new FileStream(fileName, FileMode.Open);
            gameData = UndertaleIO.Read(fs, (string warning, bool isImportant) =>
            {
                Console.WriteLine($"[WARNING]: {warning}");
                warnings.Add(warning);

                if (isImportant)
                {
                    hadImportantWarnings = true;
                }
            }, (string message) =>
            {
                SendMessageToWorker(messageId, message);
            });
        }
        finally
        {
            File.Delete(fileName);
        }

        DataHolder.SetData(gameData);

        DataFileLoadInfo info = new()
        {
            Successful = true,
            HadImportantWarnings = hadImportantWarnings,
            Warnings = warnings,
            UMTLibVersion = Assembly.GetAssembly(typeof(UndertaleData))?.GetName().Version?.ToString() ?? "",
        };

        return JsonSerializer.Serialize(info, DataFileLoadInfoContext.Default.DataFileLoadInfo);
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static bool SaveDataFile(int messageId, string fileName)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        using FileStream fs = new(fileName, FileMode.Create, FileAccess.Write);
        UndertaleIO.Write(fs, gameData, (string message) =>
        {
            SendMessageToWorker(messageId, message);
        });

        return true;
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string GetGameInfo()
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        // Special check for audio groups
        int audioGroupsCount = gameData.AudioGroups.Count;
        if (audioGroupsCount == 1 && gameData.AudioGroups[0] is null)
        {
            audioGroupsCount = 0;
        }

        // todo doesn't work for audiogroup*.dat
        GameInfo gameInfo = new()
        {
            ProjectName = gameData.GeneralInfo.Name.Content,
            DisplayName = gameData.GeneralInfo.DisplayName.Content,
            IsGameMaker2 = gameData.IsGameMaker2(),
            IsYYC = gameData.IsYYC(),
            IsDebuggerDisabled = gameData.GeneralInfo.IsDebuggerDisabled,
            IsUnsupportedBytecodeVersion = gameData.UnsupportedBytecodeVersion,
            Version = new()
            {
                Major = gameData.GeneralInfo.Major,
                Minor = gameData.GeneralInfo.Minor,
                Release = gameData.GeneralInfo.Release,
                Build = gameData.GeneralInfo.Build,
            },

            BytecodeVersion = gameData.GeneralInfo.BytecodeVersion,
            ConfigurationName = gameData.GeneralInfo.Config.Content,
            ItemCounts = new()
            {
                Sprites = gameData.Sprites.Count,
                Sounds = gameData.Sounds.Count,
                AudioGroups = audioGroupsCount,
                Backgrounds = gameData.Backgrounds.Count,
                Paths = gameData.Paths.Count,
                Scripts = gameData.Scripts.Count,
                Shaders = gameData.Shaders.Count,
                Fonts = gameData.Fonts.Count,
                Timelines = gameData.Timelines.Count,
                GameObjects = gameData.GameObjects.Count,
                Rooms = gameData.Rooms.Count,
                Extensions = gameData.Extensions.Count,
                TexturePageItems = gameData.TexturePageItems.Count,
                TextureGroupInfo = gameData.TextureGroupInfo?.Count ?? 0,

                // could be null if YYC
                Code = gameData.Code?.Count ?? 0,
                Variables = gameData.Variables?.Count ?? 0,
                Functions = gameData.Functions?.Count ?? 0,
                CodeLocals = gameData.CodeLocals?.Count ?? 0,

                Strings = gameData.Strings.Count,
                GlobalInitScripts = gameData.GlobalInitScripts?.Count ?? 0,
                EmbeddedTextures = gameData.EmbeddedTextures.Count,
                EmbeddedImages = gameData.EmbeddedImages?.Count ?? 0,
                EmbeddedAudio = gameData.EmbeddedAudio.Count,
                ParticleSystems = gameData.ParticleSystems?.Count ?? 0,
                ParticleSystemEmitters = gameData.ParticleSystemEmitters?.Count ?? 0,
            },
        };

        return JsonSerializer.Serialize(gameInfo, GameInfoContext.Default.GameInfo);
    }

    /// <param name="modelTypeInt">Value in <see cref="ModelType" />, needs to be int due to SYSLIB1072</param>
    [JSExport]
    public static string ListEntriesByModelType(int modelTypeInt)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        ModelType modelType = Enum.Parse<ModelType>(modelTypeInt.ToString());

        IEnumerable<UndertaleObject> model;
        switch (modelType)
        {
            case ModelType.Sprites:
                model = gameData.Sprites;
                break;

            case ModelType.Sounds:
                model = gameData.Sounds;
                break;

            case ModelType.AudioGroups:
                model = gameData.AudioGroups;
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

            case ModelType.Code:
                // Also see ListCodeEntries()
                model = gameData.Code;
                break;

            case ModelType.Variables:
                model = gameData.Variables;
                break;

            case ModelType.Functions:
                model = gameData.Functions;
                break;

            case ModelType.CodeLocals:
                model = gameData.CodeLocals;
                break;

            case ModelType.Strings:
                model = gameData.Strings;
                break;

            case ModelType.GlobalInitScripts:
                model = gameData.GlobalInitScripts;
                break;

            case ModelType.EmbeddedTextures:
                model = gameData.EmbeddedTextures;
                break;

            case ModelType.EmbeddedImages:
                model = gameData.EmbeddedImages;
                break;

            case ModelType.EmbeddedAudio:
                model = gameData.EmbeddedAudio;
                break;

            case ModelType.ParticleSystems:
                model = gameData.ParticleSystems;
                break;

            case ModelType.ParticleSystemEmitters:
                model = gameData.ParticleSystemEmitters;
                break;

            default:
                throw new NotImplementedException($"Model type {modelType} is not implemented.");
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
                    else if (entry is UndertaleGlobalInit globalInitEntry)
                    {
                        if (globalInitEntry.Code is not null)
                        {
                            entries.Add(globalInitEntry.Code.Name.Content);
                        }
                    }
                    else
                    {
                        throw new NotImplementedException($"Model type {modelType} does not have a valid name implementation.");
                    }
                }
            }
        }

        return JsonSerializer.Serialize(entries, ItemListJsonContext.Default.ListString);
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string GetSpriteInfoByName(string name)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        UndertaleSprite sprite = gameData.Sprites.First(sprite => name == sprite?.Name.Content);

        SpriteInfo spriteInfo = new()
        {
            TexturePageIDs = sprite.Textures.Select(entry => gameData.TexturePageItems.IndexOf(entry.Texture)).ToArray(),
        };

        return JsonSerializer.Serialize(spriteInfo, SpriteInfoContext.Default.SpriteInfo);
    }

    #region Code
    [JSExport]
    public static string ListCodeEntries(bool showChildEntries)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        if (gameData.Code is null)
        {
            throw new Exception("This game has no code entries.");
        }

        List<CodeEntry> entries = [];
        foreach (UndertaleCode entry in gameData.Code)
        {
            if (entry is not null)
            {
                if (!showChildEntries && entry.ParentEntry is not null)
                {
                    continue;
                }

                entries.Add(new()
                {
                    Name = entry.Name.Content,
                    HasParentEntry = entry.ParentEntry is not null,
                });
            }
        }

        return JsonSerializer.Serialize(entries, CodeEntryListContext.Default.ListCodeEntry);
    }

    [JSExport]
    public static string GetCodeInfoByName(string name)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        if (gameData.Code is null)
        {
            throw new Exception("This game has no code entries.");
        }

        UndertaleCode code = gameData.Code.First(code => name == code.Name.Content);

        CodeInfo codeInfo = new();

        if (code.ParentEntry is not null)
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

        return JsonSerializer.Serialize(codeInfo, CodeInfoContext.Default.CodeInfo);
    }

    [JSExport]
    public static bool EditCodeTextByName(string name, string sourceCode)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        if (gameData.Code is null)
        {
            throw new Exception("This game has no code entries.");
        }

        UndertaleCode code = gameData.Code.First(code => name == code.Name.Content);

        if (code.ParentEntry is not null)
        {
            throw new Exception("Cannot edit code of a child code entry.");
        }

        CompileGroup group = new(gameData);
        group.QueueCodeReplace(code, sourceCode);
        CompileResult compileResult = group.Compile();

        if (!compileResult.Successful)
        {
            throw new Exception("Compile error:\n\n" + compileResult.PrintAllErrors(false));
        }

        return true;
    }
    #endregion Code

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string GetSoundInfoByName(string name)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        UndertaleSound sound = gameData.Sounds.First(sound => name == sound.Name.Content);

        SoundInfo soundInfo = new()
        {
            // Some sounds don't have IsEmbedded flag, but AudioFile points to the previous sound -_-
            //
            // UMT's behavior is to check for the IsEmbedded flag first before considering AudioFile
            // https://github.com/UnderminersTeam/UndertaleModTool/blob/cf68ac34d243757aaccb028b87bcf9703b2a28ca/UndertaleModTool/Editors/UndertaleSoundEditor.xaml.cs#L101C17-L101C119
            FileContents = sound.Flags.HasFlag(UndertaleSound.AudioEntryFlags.IsEmbedded)
                ? sound.AudioFile?.Data
                : null,
            Flags = sound.Flags,
            ExternalFileName = sound.File.Content,
            AudioGroupID = sound.GroupID,
            AudioGroupName = sound.AudioGroup?.Name.Content ?? "",
        };

        return JsonSerializer.Serialize(soundInfo, SoundInfoContext.Default.SoundInfo);
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string GetEmbeddedTextureInfoById(int id)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        UndertaleEmbeddedTexture texture = gameData.EmbeddedTextures[id];

        // No need to convert PNGs since the browser can view them
        // Skip DDS as ConvertToRawBgra() may call ImageMagick for some image formats
        // https://github.com/UnderminersTeam/UndertaleModTool/blob/2b6fe69722cec25219f1ae21f8111907c2a15629/UndertaleModLib/Util/GMImage.cs#L749
        byte[]? downloadableFileContents = null;
        byte[]? bgraCompressed = null;
        switch (texture.TextureData.Image.Format)
        {
            case GMImage.ImageFormat.Png:
            case GMImage.ImageFormat.Dds:
                {
                    using MemoryStream stream = new();
                    using BinaryWriter writer = new(stream);
                    texture.TextureData.Image.WriteToBinaryWriter(writer, gameData.IsVersionAtLeast(2022, 5));
                    downloadableFileContents = stream.ToArray();
                    break;
                }

            default:
                {
                    byte[] bgra = texture.TextureData.Image.ConvertToRawBgra().GetRawImageData().ToArray();

                    using MemoryStream memoryStream = new();
                    using (ZLibStream deflateStream = new(memoryStream, CompressionMode.Compress))
                    {
                        // Make sure dispose is run https://stackoverflow.com/a/77639217
                        deflateStream.Write(bgra, 0, bgra.Length);
                    }
                    bgraCompressed = memoryStream.ToArray();
                    break;
                }
        }

        EmbeddedTextureInfo embeddedTextureInfo = new()
        {
            DownloadableFileContents = downloadableFileContents,
            BgraCompressed = bgraCompressed,
            Format = texture.TextureData.Image.Format,
            Width = texture.TextureData.Image.Width,
            Height = texture.TextureData.Image.Height,
        };

        return JsonSerializer.Serialize(embeddedTextureInfo, EmbeddedTextureInfoContext.Default.EmbeddedTextureInfo);
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string GetTexturePageInfoById(int id)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        UndertaleTexturePageItem item = gameData.TexturePageItems[id];

        TexturePageInfo texturePageInfo = new()
        {
            EmbeddedTextureID = gameData.EmbeddedTextures.IndexOf(item.TexturePage),

            SourceX = item.SourceX,
            SourceY = item.SourceY,
            SourceWidth = item.SourceWidth,
            SourceHeight = item.SourceHeight,

            TargetX = item.TargetX,
            TargetY = item.TargetY,
            TargetWidth = item.TargetWidth,
            TargetHeight = item.TargetHeight,

            BoundingWidth = item.BoundingWidth,
            BoundingHeight = item.BoundingHeight,
        };

        return JsonSerializer.Serialize(texturePageInfo, TexturePageInfoContext.Default.TexturePageInfo);
    }

    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string GetEmbeddedAudioInfoById(int id)
    {
        UndertaleData gameData = DataHolder.GetNonNullData();

        UndertaleEmbeddedAudio audio = gameData.EmbeddedAudio[id];

        EmbeddedAudioInfo audioInfo = new()
        {
            FileContents = audio.Data,
        };

        return JsonSerializer.Serialize(audioInfo, EmbeddedAudioInfoContext.Default.EmbeddedAudioInfo);
    }
}
