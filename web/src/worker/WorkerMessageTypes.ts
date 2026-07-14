import type {GetCodeListResult, GetCodeListType} from '../messages/getCodeList';
import type {ReadFileRequest, ReadFileResult} from '../messages/readFile';

export type WorkerStatuses = 'LOADING' | 'PROCESSING' | 'FINISHED' | 'ERROR';

export type WorkerRequest = {
	messageId: number;
	message: ReadFileRequest | GetCodeListType;
};

export type AllResults = ReadFileResult | GetCodeListResult;

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
