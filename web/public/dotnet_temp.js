// @ts-check

import {dotnet} from './dotnet/wwwroot/_framework/dotnet.js';

const {getAssemblyExports, getConfig, Module} = await dotnet
	.withDiagnosticTracing(false)
	.withApplicationArgumentsFromQuery()
	.create();

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

document.getElementById('file').addEventListener('change', async (ev) => {
	const fileInput = ev.currentTarget;
	if (!(fileInput instanceof HTMLInputElement)) {
		throw new Error('Expected HTMLInputElement');
	}

	if (!fileInput.files || !fileInput.files[0]) {
		return;
	}

	const file = fileInput.files[0];
	Module.FS.writeFile('data.win', await file.bytes());

	const text = await exports.UndertaleModToolWASM.ReadFile('data.win');

	console.log(text);
});
