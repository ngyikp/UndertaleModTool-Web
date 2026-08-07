import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type DeleteDataFileRequest = {
	type: 'deleteDataFile';
	fileName: string;
};

export type DeleteDataFileResult = true;

export function deleteDataFile(fileName: string) {
	return sendMessageToWorkerAsPromise<DeleteDataFileResult>({
		type: 'deleteDataFile',
		fileName,
	});
}
