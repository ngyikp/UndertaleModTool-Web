import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetSoundDataByNameRequest = {
	type: 'getSoundDataByName';
	name: string;
};

export type GetSoundDataByNameResult = {
	soundData: Uint8Array<ArrayBuffer>;
};

export function getSoundDataByName(name: string) {
	return sendMessageToWorkerAsPromise<GetSoundDataByNameResult>({
		type: 'getSoundDataByName',
		name,
	});
}
