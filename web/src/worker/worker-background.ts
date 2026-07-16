import {GameInfoSchema} from '../types/GameInfoType';

import type {AppExports, DotNetType} from './DotNetType';
import type {AllWorkerResponses, WorkerRequest} from './WorkerMessageTypes';

let dotNet: DotNetType | null = null;

const LOADER_URL = new URL(
	'/dotnet/wwwroot/_framework/dotnet.js',
	import.meta.url,
).href;

async function loadAssembly() {
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

	const exports = (await getAssemblyExports(
		mainAssemblyName,
	)) as AppExports | null;
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

			case 'getEntriesByModelType': {
				const list = dotNet.exports.UndertaleModToolWASM.GetEntriesByModelType(
					request.message.modelType,
				);

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

			case 'getCodeByName':
				reply({
					status: 'FINISHED',
					result: {
						// todo
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						decompiledCode: JSON.parse(
							dotNet.exports.UndertaleModToolWASM.GetCodeByName(
								request.message.name,
							),
						),
					},
				});
				break;

			case 'getSoundDataByName':
				reply({
					status: 'FINISHED',
					result: {
						soundData: dotNet.exports.UndertaleModToolWASM.GetSoundDataByName(
							request.message.name,
						),
					},
				});
				break;

			case 'getEmbeddedTextureImageById':
				reply({
					status: 'FINISHED',
					result: {
						imageData:
							dotNet.exports.UndertaleModToolWASM.GetEmbeddedTextureImageById(
								request.message.id,
							),
					},
				});
				break;

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
