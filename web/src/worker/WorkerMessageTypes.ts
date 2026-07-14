import type {GameInfoType} from '../GameInfo';

export type WorkerRequest = {
	messageId: number;
	loaderUrl: string;
	bytes: Uint8Array<ArrayBuffer>;
};

export type WorkerStatuses = 'LOADING' | 'PROCESSING' | 'FINISHED' | 'ERROR';

export type WorkerResponses =
	| {
			status: Exclude<WorkerStatuses, 'FINISHED' | 'ERROR'>;
	  }
	| {
			status: 'FINISHED';
			info: GameInfoType;
	  }
	| {
			status: 'ERROR';
			errorDetails: string;
	  };
