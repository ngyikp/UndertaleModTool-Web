// Based on https://github.com/dotnet/blazor-samples/blob/main/10.0/DotNetOnWebWorkersReact/react/src/

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
		const port = messagePorts.get(data.messageId);
		if (!port) {
			return;
		}
		port(data.response);

		if (
			data.response.status === 'FINISHED' ||
			data.response.status === 'ERROR'
		) {
			messagePorts.delete(data.messageId);
		}
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

	messagePorts.clear();
	worker = null;
}

export function sendMessageToWorker<FinishedResult extends AllResults>(
	message: WorkerRequest['message'],
	onStatusChanged: (response: SpecificWorkerResponses<FinishedResult>) => void,
) {
	worker = startWorker();

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
