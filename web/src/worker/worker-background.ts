import {CodeInfoSchema} from '../messages/getCodeInfoByName';
import {EmbeddedTextureInfoSchema} from '../messages/getEmbeddedTextureInfoById.js';
import {EntriesListInfoSchema} from '../messages/getEntriesByModelType';
import {SoundInfoSchema} from '../messages/getSoundInfoByName';
import {TexturePageInfoSchema} from '../messages/getTexturePageInfoById.js';
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

				reply({
					status: 'FINISHED',
					result: {
						info: GameInfoSchema.parse(
							JSON.parse(
								dotNet.exports.UndertaleModToolWASM.ReadFile('data.win'),
							),
						),
					},
				});
				break;
			}

			case 'getEntriesByModelType': {
				reply({
					status: 'FINISHED',
					result: {
						list: EntriesListInfoSchema.parse(
							JSON.parse(
								dotNet.exports.UndertaleModToolWASM.GetEntriesByModelType(
									request.message.modelType,
								),
							),
						),
					},
				});
				break;
			}

			case 'getCodeInfoByName':
				reply({
					status: 'FINISHED',
					result: CodeInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.GetCodeInfoByName(
								request.message.name,
							),
						),
					),
				});
				break;

			case 'getSoundInfoByName':
				reply({
					status: 'FINISHED',
					result: SoundInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.GetSoundInfoByName(
								request.message.name,
							),
						),
					),
				});
				break;

			case 'getEmbeddedTextureInfoById':
				reply({
					status: 'FINISHED',
					result: EmbeddedTextureInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.GetEmbeddedTextureInfoById(
								request.message.id,
							),
						),
					),
				});
				break;

			case 'getTexturePageInfoById':
				reply({
					status: 'FINISHED',
					result: TexturePageInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.GetTexturePageInfoById(
								request.message.id,
							),
						),
					),
				});
				break;

			default:
				throw new Error('Unknown message type');
		}
	} catch (error) {
		let errorDetails = 'Unknown error';
		let errorStack = '';
		let isManagedError = false;

		if (error instanceof Error) {
			errorDetails = error.message;
			errorStack = error.stack ?? '';

			// https://github.com/dotnet/runtime/blob/ea3f7f141e0596cab37785d305910e64d031ab29/src/mono/browser/runtime/marshal.ts#L397
			// not the best assumption if it gets minified ¯\_(ツ)_/¯
			if (error.constructor.name === 'ManagedError') {
				isManagedError = true;
			}
		}

		reply({
			status: 'ERROR',
			errorDetails,
			errorStack,
			isManagedError,
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
