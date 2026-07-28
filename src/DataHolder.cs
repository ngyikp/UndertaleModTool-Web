using UndertaleModLib;

namespace UndertaleModToolWASM;

public partial class DataHolder
{
    private static UndertaleData? Data;

    public static void SetData(UndertaleData data)
    {
        Data = data;
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