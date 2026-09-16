// Based on https://github.com/dotnet/blazor-samples/blob/main/10.0/DotNetOnWebWorkersReact/react/src/

import GameDataNotLoadedError from '../common/GameDataNotLoadedError';

import {ManagedErrorFromDotNet} from './ManagedErrorFromDotNet';
import type {
	AllResults,
	AllWorkerResponses,
	SpecificWorkerResponses,
	WorkerRequest,
} from './WorkerMessageTypes';

const messagePorts = new Map<
	number,
	(response: SpecificWorkerResponses<AllResults>) => void
>();
let messageNewId = 0;

let worker: SharedWorker | null = null;

function startWorker() {
	if (worker) {
		return worker;
	}

	worker = new SharedWorker(new URL('./worker-background', import.meta.url), {
		type: 'module',
	});

	worker.port.onmessage = ({
		data,
	}: MessageEvent<{
		messageId: number;
		response: AllWorkerResponses;
	}>) => {
		if (data.response.status === 'STOPPING') {
			messagePorts.clear();
			worker = null;
			return;
		}

		const respond = messagePorts.get(data.messageId);
		if (!respond) {
			return;
		}
		respond(data.response);

		if (
			data.response.status === 'FINISHED' ||
			data.response.status === 'ERROR'
		) {
			messagePorts.delete(data.messageId);
		}
	};

	worker.port.onmessageerror = (ev) => {
		console.error(ev);
	};

	return worker;
}

export function stopWorker() {
	if (worker) {
		sendMessageToWorker(
			{
				type: 'stopWorker',
			},
			() => {},
		);
	}
}

export function sendMessageToWorker<FinishedResult extends AllResults>(
	message: WorkerRequest['message'],
	onStatusChanged: (response: SpecificWorkerResponses<FinishedResult>) => void,
) {
	if (!worker) {
		if (
			message.type === 'readFile' ||
			// If we navigate to specific URL, then we need to start worker to
			// figure out if data is already loaded
			message.type === 'getGameInfo'
		) {
			worker = startWorker();
		} else {
			throw new GameDataNotLoadedError();
		}
	}

	messageNewId += 1;
	// @ts-expect-error this is a headache to fix
	messagePorts.set(messageNewId, onStatusChanged);

	worker.port.postMessage({
		messageId: messageNewId,
		message,
	});
}

export function sendMessageToWorkerAsPromise<FinishedResult extends AllResults>(
	message: WorkerRequest['message'],
): Promise<FinishedResult> {
	return new Promise((resolve, reject) => {
		sendMessageToWorker(message, (response) => {
			switch (response.status) {
				case 'FINISHED':
					// @ts-expect-error this is a headache to fix
					resolve(response.result);
					break;

				case 'ERROR':
					reject(
						response.isManagedError
							? new ManagedErrorFromDotNet(
									response.errorDetails,
									response.errorStack,
								)
							: new Error(response.errorDetails),
					);
					break;

				default:
					break;
			}
		});
	});
}
