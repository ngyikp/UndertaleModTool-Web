# UndertaleModTool in WASM

## Development

[Install .NET 10.0 SDK](https://dotnet.microsoft.com/en-us/download).

Install the .NET workload:

```sh
dotnet workload install wasm-tools
```

Compile the .NET app:

```sh
rm -rf web/public/dotnet/
dotnet publish -c Debug src/
```

Then run the React web app:

```sh
cd web
npm install
npm run dev
```
