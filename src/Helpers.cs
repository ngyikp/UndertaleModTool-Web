using UndertaleModLib.Models;

namespace UndertaleModToolWASM;

public partial class Helpers
{
    public static string GetDisplayTitle(UndertaleGeneralInfo? generalInfo, string userFileName)
    {
        string displayName = generalInfo?.DisplayName.Content ?? "";
        string projectName = generalInfo?.Name.Content ?? "";

        string t = displayName;
        if (projectName != "" && displayName.ToLower() != projectName.ToLower())
        {
            if (t != "")
            {
                t += $" ({projectName})";
            }
            else
            {
                t += projectName;
            }
        }

        if (t == "")
        {
            return userFileName;
        }

        return t;
    }
}
