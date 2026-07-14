import type {GameInfoType} from '../GameInfoType';

export type WorkerRequest = {
	messageId: number;
	message:
		| {
				type: 'readFile';
				bytes: Uint8Array<ArrayBuffer>;
		  }
		| {type: 'getCodeList'};
};

export type WorkerStatuses = 'LOADING' | 'PROCESSING' | 'FINISHED' | 'ERROR';

export interface ReadFileResult {
	info: GameInfoType;
}

export interface GetCodeListResult {
	list: string[];
}

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
