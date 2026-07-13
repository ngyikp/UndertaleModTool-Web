import { dotnet } from './_framework/dotnet.js';

const { getAssemblyExports, getConfig } = await dotnet
  .withDiagnosticTracing(false)
  .withApplicationArgumentsFromQuery()
  .create();

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

document.getElementById('file').addEventListener('change', async (ev) => {
  const file = ev.currentTarget.files[0];
  const bytes = new Uint8Array(await file.arrayBuffer());

  const text = await exports.UndertaleModToolWASM.ReadFile(bytes);
  console.log(text);
});
