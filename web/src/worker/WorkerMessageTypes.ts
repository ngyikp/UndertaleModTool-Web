import type {
	EditCodeTextByNameRequest,
	EditCodeTextByNameResult,
} from '../messages/editCodeTextByName';
import type {
	GetCodeInfoByNameRequest,
	GetCodeInfoByNameResult,
} from '../messages/getCodeInfoByName';
import type {
	GetEmbeddedTextureInfoByIdRequest,
	GetEmbeddedTextureInfoByIdResult,
} from '../messages/getEmbeddedTextureInfoById';
import type {
	GetEntriesByModelTypeRequest,
	GetEntriesByModelTypeResult,
} from '../messages/getEntriesByModelType';
import type {
	GetSoundInfoByNameRequest,
	GetSoundInfoByNameResult,
} from '../messages/getSoundInfoByName';
import type {
	GetSpriteInfoByNameRequest,
	GetSpriteInfoByNameResult,
} from '../messages/getSpriteInfoByName';
import type {
	GetTexturePageInfoByIdRequest,
	GetTexturePageInfoByIdResult,
} from '../messages/getTexturePageInfoById';
import type {ReadFileRequest, ReadFileResult} from '../messages/readFile';

export type WorkerStatuses = 'LOADING' | 'PROCESSING' | 'FINISHED' | 'ERROR';

export type WorkerRequest = {
	messageId: number;
	message:
		| ReadFileRequest
		| EditCodeTextByNameRequest
		| GetCodeInfoByNameRequest
		| GetEmbeddedTextureInfoByIdRequest
		| GetEntriesByModelTypeRequest
		| GetSoundInfoByNameRequest
		| GetSpriteInfoByNameRequest
		| GetTexturePageInfoByIdRequest;
};

export type AllResults =
	| ReadFileResult
	| EditCodeTextByNameResult
	| GetCodeInfoByNameResult
	| GetEmbeddedTextureInfoByIdResult
	| GetEntriesByModelTypeResult
	| GetSoundInfoByNameResult
	| GetSpriteInfoByNameResult
	| GetTexturePageInfoByIdResult;

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
