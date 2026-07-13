export default function App() {
	function onFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
		const fileInput = ev.currentTarget;
		if (!(fileInput instanceof HTMLInputElement)) {
			throw new Error('Expected HTMLInputElement');
		}

		if (fileInput.files && fileInput.files[0]) {
			void processFile(fileInput.files[0]);
		}
	}

	async function processFile(file: File) {
		console.log('Starting...');

		const module = (await import(
			new URL('/dotnet/wwwroot/_framework/dotnet.js', import.meta.url).href
		)) as typeof import('../public/dotnet/wwwroot/_framework/dotnet.js');

		const {
			// eslint-disable-next-line @typescript-eslint/unbound-method
			getAssemblyExports,
			getConfig,
			Module,
		} = await module.dotnet.withDiagnosticTracing(import.meta.env.DEV).create();

		const config = getConfig();
		const exports = await getAssemblyExports(config.mainAssemblyName);

		// @ts-expect-error Module.FS doesn't exist on the types
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		Module.FS.writeFile('data.win', await file.bytes());

		const text = await exports.UndertaleModToolWASM.ReadFile('data.win');

		console.log(text);
	}

	return (
		<>
			<h1>UndertaleModTool on the Web</h1>

			<input type="file" onChange={onFileChange} />
		</>
	);
}
