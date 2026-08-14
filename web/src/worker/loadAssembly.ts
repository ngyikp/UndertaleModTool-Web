import type {AppExports} from './DotNetType';

export default async function loadAssembly(
	loaderUrl: string,
	diagnosticTracing: boolean,
) {
	const module = (await import(
		/* @vite-ignore */ loaderUrl
	)) as typeof import('../../public/dotnet/wwwroot/_framework/dotnet.js');

	const {
		// eslint-disable-next-line @typescript-eslint/unbound-method
		getAssemblyExports,
		getConfig,
		Module,
	} = await module.dotnet.withDiagnosticTracing(diagnosticTracing).create();

	const {mainAssemblyName} = getConfig();
	if (!mainAssemblyName) {
		throw new Error('Missing main assembly name');
	}

	const exports = (await getAssemblyExports(
		mainAssemblyName,
	)) as AppExports | null;
	if (!exports) {
		throw new Error('Missing assembly exports');
	}

	return {exports, Module};
}
