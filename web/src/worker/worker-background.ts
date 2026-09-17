/// <reference lib="webworker" />

import GameDataNotLoadedError from '../common/GameDataNotLoadedError';
import {CodeInfoSchema} from '../messages/getCodeInfoByName';
import {DataFileLoadInfoSchema} from '../messages/getDataFileLoadInfo';
import {EmbeddedAudioInfoSchema} from '../messages/getEmbeddedAudioInfoById';
import {
	EmbeddedTextureInfoDotNetSchema,
	EmbeddedTextureInfoSchema,
} from '../messages/getEmbeddedTextureInfoById';
import {EntriesListInfoSchema} from '../messages/getEntriesByModelType';
import {GameObjectInfoSchema} from '../messages/getGameObjectInfoByName';
import {SoundInfoSchema} from '../messages/getSoundInfoByName';
import {SpriteInfoSchema} from '../messages/getSpriteInfoByName';
import {TexturePageInfoSchema} from '../messages/getTexturePageInfoById';
import {CodeEntryListInfoSchema} from '../messages/listCodeEntries';
import {GameInfoSchema} from '../types/GameInfoType';

import type {DotNetType} from './DotNetType';
import loadAssembly from './loadAssembly';
import type {AllWorkerResponses, WorkerRequest} from './WorkerMessageTypes';

declare const self: SharedWorkerGlobalScope;

const LOADER_URL = new URL(
	'/dotnet/wwwroot/_framework/' + (DOTNET_JS_PATH ?? 'dotnet.js'),
	import.meta.url,
).href;

const allPorts: MessagePort[] = [];
let dotNet: DotNetType | null = null;

async function onMessage(port: MessagePort, request: WorkerRequest) {
	const reply = (response: AllWorkerResponses) => {
		port.postMessage({
			messageId: request.messageId,
			response,
		});
	};

	try {
		if (request.message.type === 'stopWorker') {
			stopWorker();
			return;
		}

		if (!dotNet) {
			if (request.message.type === 'readFile') {
				reply({status: 'LOADING'});

				dotNet = await loadAssembly(LOADER_URL, import.meta.env.DEV);
			} else {
				throw new GameDataNotLoadedError();
			}
		}

		reply({status: 'PROCESSING'});

		switch (request.message.type) {
			case 'readFile': {
				const fsName = 'data.win';
				dotNet.Module.FS.writeFile(fsName, request.message.bytes);

				reply({
					status: 'FINISHED',
					result: DataFileLoadInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.Program.ReadFile(
								allPorts.indexOf(port),
								request.messageId,
								fsName,
								request.message.fileName,
							),
						),
					),
				});
				break;
			}

			case 'saveDataFile':
				dotNet.exports.UndertaleModToolWASM.Program.SaveDataFile(
					allPorts.indexOf(port),
					request.messageId,
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

			case 'getDataFileLoadInfo':
				reply({
					status: 'FINISHED',
					result: DataFileLoadInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.Program.GetDataFileLoadInfo(),
						),
					),
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
								dotNet.exports.UndertaleModToolWASM.Program.ListEntriesByModelType(
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

			case 'getGameObjectInfoByName':
				reply({
					status: 'FINISHED',
					result: GameObjectInfoSchema.parse(
						JSON.parse(
							dotNet.exports.UndertaleModToolWASM.Program.GetGameObjectInfoByName(
								request.message.name,
							),
						),
					),
				});
				break;

			case 'listCodeEntries': {
				reply({
					status: 'FINISHED',
					result: {
						list: CodeEntryListInfoSchema.parse(
							JSON.parse(
								dotNet.exports.UndertaleModToolWASM.Program.ListCodeEntries(),
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

			case 'getEmbeddedTextureInfoById': {
				const info = EmbeddedTextureInfoDotNetSchema.parse(
					JSON.parse(
						dotNet.exports.UndertaleModToolWASM.Program.GetEmbeddedTextureInfoById(
							request.message.id,
						),
					),
				);

				let file: Uint8Array | null = null;
				if (info.BgraFileName != null) {
					file = dotNet.Module.FS.readFile(info.BgraFileName);
					dotNet.Module.FS.unlink(info.BgraFileName);
				}

				reply({
					status: 'FINISHED',
					result: EmbeddedTextureInfoSchema.parse({
						...info,
						Bgra: file,
					}),
				});
				break;
			}

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

self.onconnect = ({ports}) => {
	const port = ports[0];
	if (!port) {
		return;
	}
	allPorts.push(port);

	port.onmessage = (ev: MessageEvent<WorkerRequest>) => {
		void onMessage(port, ev.data);
	};
};

globalThis.receiveMessageFromDotNet = (
	portId: number,
	messageId: number,
	text: string,
) => {
	const port = allPorts[portId];
	if (!port) {
		return;
	}

	port.postMessage({
		messageId,
		response: {
			status: 'MESSAGE_FROM_DOTNET',
			result: text,
		},
	});
};

function stopWorker() {
	allPorts.forEach((port) => {
		port.postMessage({
			response: {
				status: 'STOPPING',
			},
		});
	});
	self.close();
}

declare global {
	function receiveMessageFromDotNet(
		portId: number,
		messageId: number,
		text: string,
	): void;
}
