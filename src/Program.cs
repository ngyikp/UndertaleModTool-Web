using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

return;

public partial class UndertaleModToolWASM
{
    [JSExport]
    [SupportedOSPlatform("browser")]
    public static string ReadFile(byte[] file)
    {
        return "Hello from ReadFile";
    }
}
