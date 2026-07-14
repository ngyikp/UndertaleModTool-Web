import type {EmscriptenModule} from '../../public/dotnet/wwwroot/_framework/dotnet';
import {GameInfoSchema} from '../GameInfoType';

import type {WorkerRequest, AllWorkerResponses} from './WorkerMessageTypes';

type AppExports = {
	UndertaleModToolWASM: {
		ReadFile(fileName: string): string;
		GetCodeList(): string;
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

const LOADER_URL = new URL(
	'/dotnet/wwwroot/_framework/dotnet.js',
	import.meta.url,
).href;

async function loadAssembly<AppExports>() {
	const module = (await import(
		/* @vite-ignore */ LOADER_URL
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
	const reply = (response: AllWorkerResponses) => {
		self.postMessage({
			messageId: request.messageId,
			response,
		});
	};

	try {
		if (!dotNet) {
			reply({status: 'LOADING'});

			dotNet = await loadAssembly();
		}

		reply({status: 'PROCESSING'});

		switch (request.message.type) {
			case 'readFile': {
				dotNet.Module.FS.writeFile('data.win', request.message.bytes);
				const info = dotNet.exports.UndertaleModToolWASM.ReadFile('data.win');

				reply({
					status: 'FINISHED',
					result: {
						info: GameInfoSchema.parse(JSON.parse(info)),
					},
				});

				break;
			}

			case 'getCodeList': {
				const list = dotNet.exports.UndertaleModToolWASM.GetCodeList();

				reply({
					status: 'FINISHED',
					result: {
						// todo
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						list: JSON.parse(list),
					},
				});

				break;
			}

			default:
				throw new Error('Unknown message type');
		}
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
