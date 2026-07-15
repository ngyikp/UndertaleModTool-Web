import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetCodeByNameRequest = {
	type: 'getCodeByName';
	name: string;
};

export type GetCodeByNameResult = {
	decompiledCode: string;
};

export function getCodeByName(name: string) {
	return sendMessageToWorkerAsPromise<GetCodeByNameResult>({
		type: 'getCodeByName',
		name,
	});
}
