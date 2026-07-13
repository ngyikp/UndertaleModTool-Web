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
			info: string;
	  }
	| {
			status: 'ERROR';
			errorDetails: string;
	  };
