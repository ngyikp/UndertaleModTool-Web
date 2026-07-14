// Based on https://github.com/dotnet/blazor-samples/blob/main/10.0/DotNetOnWebWorkersReact/react/src/

import type {
	AllResults,
	AllWorkerResponses,
	GetCodeListResult,
	ReadFileResult,
	SpecificWorkerResponses,
	WorkerRequest,
} from './WorkerMessageTypes';

const messagePorts = new Map<
	number,
	(response: SpecificWorkerResponses<AllResults>) => void
>();
let messageNewId = 0;

let worker: Worker | null = null;

function startWorker() {
	if (worker) {
		return worker;
	}

	worker = new Worker(new URL('./worker-background', import.meta.url), {
		type: 'module',
	});

	worker.addEventListener(
		'message',
		({
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
		},
		false,
	);

	return worker;
}

function sendMessage<FinishedResult extends AllResults>(
	message: WorkerRequest['message'],
	onStatusChanged: (response: SpecificWorkerResponses<FinishedResult>) => void,
) {
	worker = startWorker();

	messageNewId += 1;
	// @ts-expect-error this is a headache to fix
	messagePorts.set(messageNewId, onStatusChanged);

	worker.postMessage({
		messageId: messageNewId,
		message,
	});
}

export function loadFile(
	bytes: Uint8Array<ArrayBuffer>,
	onStatusChanged: (response: SpecificWorkerResponses<ReadFileResult>) => void,
) {
	sendMessage(
		{
			type: 'readFile',
			bytes,
		},
		onStatusChanged,
	);
}

export function getCodeList(
	onStatusChanged: (
		response: SpecificWorkerResponses<GetCodeListResult>,
	) => void,
) {
	sendMessage(
		{
			type: 'getCodeList',
		},
		onStatusChanged,
	);
}
