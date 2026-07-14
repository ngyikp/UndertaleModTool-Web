import type {EmscriptenModule} from '../../public/dotnet/wwwroot/_framework/dotnet';
import {GameInfoSchema} from '../GameInfoType';

import type {WorkerRequest, WorkerResponses} from './WorkerMessageTypes';

type AppExports = {
	UndertaleModToolWASM: {
		ReadFile(fileName: string): string;
	};
};

declare module '../../public/dotnet/wwwroot/_framework/dotnet' {
	export interface EmscriptenModule {
		FS: {
			// https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.writeFile
			writeFile(
				path: string,
				data: string | ArrayBufferView,
				opts?: {flags: string},
			): void;
		};
	}
}

let dotNet: {exports: AppExports; Module: EmscriptenModule} | null = null;

async function loadAssembly<AppExports>(loaderUrl: string) {
	const module = (await import(
		/* @vite-ignore */ loaderUrl
	)) as typeof import('../../public/dotnet/wwwroot/_framework/dotnet.js');

	const {
		// eslint-disable-next-line @typescript-eslint/unbound-method
		getAssemblyExports,
		getConfig,
		Module,
	} = await module.dotnet.withDiagnosticTracing(import.meta.env.DEV).create();

	const {mainAssemblyName} = getConfig();
	if (!mainAssemblyName) {
		throw new Error('Missing main assembly name');
	}

	const exports = (await getAssemblyExports(mainAssemblyName)) as AppExports;
	if (!exports) {
		throw new Error('Missing assembly exports');
	}

	return {exports, Module};
}

async function onMessage(request: WorkerRequest) {
	const reply = (result: WorkerResponses) => {
		self.postMessage({
			messageId: request.messageId,
			result,
		});
	};

	try {
		if (!dotNet) {
			reply({status: 'LOADING'});

			dotNet = await loadAssembly(request.loaderUrl);
		}

		reply({status: 'PROCESSING'});

		dotNet.Module.FS.writeFile('data.win', request.bytes);

		const info = dotNet.exports.UndertaleModToolWASM.ReadFile('data.win');

		reply({
			status: 'FINISHED',
			info: GameInfoSchema.parse(JSON.parse(info)),
		});
	} catch (error) {
		reply({
			status: 'ERROR',
			errorDetails: error instanceof Error ? error.message : 'Unknown error',
		});
	}
}

self.addEventListener(
	'message',
	(ev: MessageEvent<WorkerRequest>) => {
		void onMessage(ev.data);
	},
	false,
);
