# Developing UndertaleModTool on the Web

## Architecture

As the core of UndertaleModTool (UndertaleModLib) is written in .NET, it is [compiled as WebAssembly](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-on-webworkers) and runs inside the browser as a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) to avoid blocking the main UI thread.

The web app knows little about the 'backend' being a web worker, in fact, the architecture is similar to a traditional client-server web app but instead of sending HTTP requests over the network, we are performing postMessages into a web worker. This makes it easier to swap out the backend for other purposes, such as for testing/mocking or even connect to a real remote server.

## Caveats

- Attempting to use ImageMagick functions (such as in `UndertaleModLib.Util.GMImage`) will result in an error: `TypeInitialization_Type, NativeMagickSettings`
- [JSExport has limited type mappings](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop/#type-mappings) to serialize info into JS-land, current workaround is to pass the data as a JSON string.
- Serializing a gigantic `byte[]` into JsonSerializer may cause .NET to run out of memory as it attempts to convert to base 64, workaround is to compress the byte array first, see `GetEmbeddedTextureInfoById()`.

## Development

First, [install .NET 10.0 SDK](https://dotnet.microsoft.com/en-us/download) and [Node.js v24+](https://nodejs.org).

Install the .NET workload:

```sh
dotnet workload update
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

### Libraries

This project is a [React](https://react.dev) app, using [TanStack Router](https://tanstack.com/router/latest) for routing and [TanStack Query](https://tanstack.com/query/latest) for data querying between the client-side web app and the WebAssembly 'backend'.

For UI styling, this project uses [Mantine](https://mantine.dev) and [Phosphor Icons](https://phosphoricons.com).

It's recommended to install the [React Developer Tools](https://react.dev/learn/react-developer-tools) on your browser for easier debugging.

### Code style

Use [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) (previously used [Prettier](https://prettier.io)). Run `npm run format` to auto-fix.

### Type-checking

Use [TypeScript](https://www.typescriptlang.org). Run `npm run tsc -- -b` to see errors.

### Linting

Use [ESLint](https://eslint.org). Run `npm run lint` to see errors.

### Tests

Use [Vitest](https://vitest.dev). Run `npm test` to run the tests.

#### Snapshot testing of game data files

`tests/load-data-file.test.ts` can be used to perform snapshot regression testing of the .NET to JavaScript portion, however this list needs to be manually set up. You can find an example list at `data-file-tests.example.jsonc` at the root directory of the repo.

There may be an error stating "Error: An error occurred while trying to read the map file at dotnet.runtime.js.map", this can be ignored.

### Code coverage

Code coverage can be obtained by running `npm test -- --coverage`

### Running all tests

The test suites are run on every push, it's best to run them on your system to avoid CI failures afterwards:

```bash
npm run tsc -- -b && npm run lint && npm test -- --run && npm run format -- --check
```

## AI policy

Please refer to the main [UndertaleModTool's AI policy](https://github.com/UnderminersTeam/UndertaleModTool/blob/master/CONTRIBUTING.md#ai-policy) (tl;dr: no).
