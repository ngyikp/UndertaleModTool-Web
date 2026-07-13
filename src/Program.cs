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
