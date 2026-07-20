import type {
	GetCodeInfoByNameRequest,
	GetCodeInfoByNameResult,
} from '../messages/getCodeInfoByName';
import type {
	GetEmbeddedTextureImageByIdRequest,
	GetEmbeddedTextureImageByIdResult,
} from '../messages/getEmbeddedTextureImageById';
import type {
	GetEntriesByModelTypeRequest,
	GetEntriesByModelTypeResult,
} from '../messages/getEntriesByModelType';
import type {
	GetSoundDataByNameRequest,
	GetSoundDataByNameResult,
} from '../messages/getSoundDataByName';
import type {ReadFileRequest, ReadFileResult} from '../messages/readFile';

export type WorkerStatuses = 'LOADING' | 'PROCESSING' | 'FINISHED' | 'ERROR';

export type WorkerRequest = {
	messageId: number;
	message:
		| ReadFileRequest
		| GetEntriesByModelTypeRequest
		| GetCodeInfoByNameRequest
		| GetSoundDataByNameRequest
		| GetEmbeddedTextureImageByIdRequest;
};

export type AllResults =
	| ReadFileResult
	| GetEntriesByModelTypeResult
	| GetCodeInfoByNameResult
	| GetSoundDataByNameResult
	| GetEmbeddedTextureImageByIdResult;

export type SpecificWorkerResponses<FinishedResult extends AllResults> =
	| {
			status: Exclude<WorkerStatuses, 'FINISHED' | 'ERROR'>;
	  }
	| {
			status: 'FINISHED';
			result: FinishedResult;
	  }
	| {
			status: 'ERROR';
			errorDetails: string;
			errorStack: string;
			isManagedError: boolean;
	  };

export type AllWorkerResponses = SpecificWorkerResponses<AllResults>;
