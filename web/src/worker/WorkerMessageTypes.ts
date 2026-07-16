import type {
	GetCodeByNameRequest,
	GetCodeByNameResult,
} from '../messages/getCodeByName';
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
		| GetCodeByNameRequest
		| GetSoundDataByNameRequest;
};

export type AllResults =
	| ReadFileResult
	| GetEntriesByModelTypeResult
	| GetCodeByNameResult
	| GetSoundDataByNameResult;

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
	  };

export type AllWorkerResponses = SpecificWorkerResponses<AllResults>;
