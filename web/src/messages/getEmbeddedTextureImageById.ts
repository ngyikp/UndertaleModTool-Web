import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetEmbeddedTextureImageByIdRequest = {
	type: 'getEmbeddedTextureImageById';
	id: number;
};

export type GetEmbeddedTextureImageByIdResult = {
	imageData: Uint8Array<ArrayBuffer>;
};

export function getEmbeddedTextureImageById(id: number) {
	return sendMessageToWorkerAsPromise<GetEmbeddedTextureImageByIdResult>({
		type: 'getEmbeddedTextureImageById',
		id,
	});
}
