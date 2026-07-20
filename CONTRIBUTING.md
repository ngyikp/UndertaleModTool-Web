# Developing UndertaleModTool on the Web

## Caveats

- Attempting to use ImageMagick functions (such as in `UndertaleModLib.Util.GMImage`) will result in an error: `TypeInitialization_Type, NativeMagickSettings`

## Development

[Install .NET 10.0 SDK](https://dotnet.microsoft.com/en-us/download).

Install the .NET workload:

```sh
dotnet workload install wasm-tools
```

Compile the .NET app first:

```sh
rm -rf web/public/dotnet/
dotnet publish -c Debug src/
```

Run the web app:

```sh
cd web
npm install
npm run dev # go to http://localhost:5173
```

Publish an optimized build on `web/dist/`:

```sh
rm -rf web/public/dotnet/
dotnet publish -c Release src/

cd web
npm run build
npm run preview # go to http://localhost:4173
```

### Code style

Use [Prettier](https://prettier.io). Run `npm run prettier -- --write` to auto-fix.

### Type-checking

Use [TypeScript](https://www.typescriptlang.org). Run `node npm run tsc -- -b` to see errors.

### Linting

Use [ESLint](https://eslint.org). Run `npm run lint` to see errors.

## AI policy

Please refer to the main [UndertaleModTool's AI policy](https://github.com/UnderminersTeam/UndertaleModTool/blob/master/CONTRIBUTING.md#ai-policy) (tl;dr: no).
