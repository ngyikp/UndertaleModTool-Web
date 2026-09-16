using UndertaleModLib;
using UndertaleModToolWASM.Serializers;

namespace UndertaleModToolWASM;

public partial class DataHolder
{
    // Only support one data file loaded in one worker process
    // to prevent reaching memory limit
    private static UndertaleData? Data;
    public static DataFileLoadInfo? LoadInfo;

    public static void SetData(UndertaleData? data)
    {
        Data = data;
    }

    public static bool IsDataLoaded()
    {
        return Data is not null;
    }

    public static UndertaleData GetNonNullData()
    {
        if (Data is null)
        {
            throw new Exception("No data file is currently loaded.");
        }

        return Data;
    }
}