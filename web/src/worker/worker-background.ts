import {CodeInfoSchema} from '../messages/getCodeInfoByName';
import {EmbeddedAudioInfoSchema} from '../messages/getEmbeddedAudioInfoById.js';
import {EmbeddedTextureInfoSchema} from '../messages/getEmbeddedTextureInfoById.js';
import {EntriesListInfoSchema} from '../messages/getEntriesByModelType';
import {SoundInfoSchema} from '../messages/getSoundInfoByName';
import {SpriteInfoSchema} from '../messages/getSpriteInfoByName.js';
import {TexturePageInfoSchema} from '../messages/getTexturePageInfoById.js';
import {DataFileLoadInfoSchema} from '../messages/readFile.js';
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
					result: DataFileLoadInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.Program.ReadFile('data.win'),
						),
					),
				});
				break;
			}

			case 'saveDataFile':
				dotNet.exports.UndertaleModToolWASM.Program.SaveDataFile(
					request.message.fileName,
				);

				reply({
					status: 'FINISHED',
					result: dotNet.Module.FS.readFile(request.message.fileName),
				});
				break;

			case 'deleteDataFile':
				dotNet.Module.FS.unlink(request.message.fileName);

				reply({
					status: 'FINISHED',
					result: true,
				});
				break;

			case 'getGameInfo': {
				reply({
					status: 'FINISHED',
					result: GameInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.Program.GetGameInfo(),
						),
					),
				});
				break;
			}

			case 'getEntriesByModelType': {
				reply({
					status: 'FINISHED',
					result: {
						list: EntriesListInfoSchema.parse(
							JSON.parse(
								dotNet.exports.UndertaleModToolWASM.Program.GetEntriesByModelType(
									request.message.modelType,
								),
							),
						),
					},
				});
				break;
			}

			case 'getSpriteInfoByName':
				reply({
					status: 'FINISHED',
					result: SpriteInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.Program.GetSpriteInfoByName(
								request.message.name,
							),
						),
					),
				});
				break;

			case 'getCodeInfoByName':
				reply({
					status: 'FINISHED',
					result: CodeInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.Program.GetCodeInfoByName(
								request.message.name,
							),
						),
					),
				});
				break;

			case 'editCodeTextByName':
				reply({
					status: 'FINISHED',
					result:
						dotNet.exports.UndertaleModToolWASM.Program.EditCodeTextByName(
							request.message.name,
							request.message.sourceCode,
						),
				});
				break;

			case 'getSoundInfoByName':
				reply({
					status: 'FINISHED',
					result: SoundInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.Program.GetSoundInfoByName(
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
							dotNet.exports.UndertaleModToolWASM.Program.GetEmbeddedTextureInfoById(
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
							dotNet.exports.UndertaleModToolWASM.Program.GetTexturePageInfoById(
								request.message.id,
							),
						),
					),
				});
				break;

			case 'getEmbeddedAudioInfoById':
				reply({
					status: 'FINISHED',
					result: EmbeddedAudioInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.Program.GetEmbeddedAudioInfoById(
								request.message.id,
							),
						),
					),
				});
				break;

			default:
				throw new Error(
					'Unknown worker message type' +
						(import.meta.env.DEV
							? '\n\n(DEV: Ensure the message is being handled at worker/worker-background.ts)'
							: ''),
				);
		}
	} catch (error) {
		let errorDetails = 'Unknown error';
		let errorStack = '';
		let isManagedError = false;

		if (error instanceof Error) {
			errorDetails = error.message;
			errorStack = error.stack ?? '';

			if (error.constructor.name === 'ManagedError') {
				// https://github.com/dotnet/runtime/blob/ea3f7f141e0596cab37785d305910e64d031ab29/src/mono/browser/runtime/marshal.ts#L397
				// not the best assumption if it gets minified ¯\_(ツ)_/¯
				isManagedError = true;
			} else if (import.meta.env.DEV) {
				// Dev-only errors that can be helpful during development
				if (
					error.message.startsWith('dotNet.exports.UndertaleModToolWASM.') &&
					error.message.endsWith(' is not a function')
				) {
					errorDetails +=
						'\n\n(DEV: Try recompiling the .NET project and reload)';
				}
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
