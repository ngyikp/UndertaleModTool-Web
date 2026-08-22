import type {
	DeleteDataFileRequest,
	DeleteDataFileResult,
} from '../messages/deleteDataFile';
import type {
	EditCodeTextByNameRequest,
	EditCodeTextByNameResult,
} from '../messages/editCodeTextByName';
import type {
	GetCodeInfoByNameRequest,
	GetCodeInfoByNameResult,
} from '../messages/getCodeInfoByName';
import type {
	GetEmbeddedAudioInfoByIdRequest,
	GetEmbeddedAudioInfoByIdResult,
} from '../messages/getEmbeddedAudioInfoById';
import type {
	GetEmbeddedTextureInfoByIdRequest,
	GetEmbeddedTextureInfoByIdResult,
} from '../messages/getEmbeddedTextureInfoById';
import type {
	GetEntriesByModelTypeRequest,
	GetEntriesByModelTypeResult,
} from '../messages/getEntriesByModelType';
import type {
	GetGameInfoRequest,
	GetGameInfoResult,
} from '../messages/getGameInfo';
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
import type {
	ListCodeEntriesRequest,
	ListCodeEntriesResult,
} from '../messages/listCodeEntries';
import type {ReadFileRequest, ReadFileResult} from '../messages/readFile';
import type {
	SaveDataFileRequest,
	SaveDataFileResult,
} from '../messages/saveDataFile';

export type WorkerStatuses =
	| 'LOADING'
	| 'PROCESSING'
	| 'MESSAGE_FROM_DOTNET'
	| 'FINISHED'
	| 'ERROR';

export type WorkerRequest = {
	messageId: number;
	message:
		| ReadFileRequest
		| SaveDataFileRequest
		| DeleteDataFileRequest
		| ListCodeEntriesRequest
		| EditCodeTextByNameRequest
		| GetCodeInfoByNameRequest
		| GetEmbeddedAudioInfoByIdRequest
		| GetEmbeddedTextureInfoByIdRequest
		| GetEntriesByModelTypeRequest
		| GetGameInfoRequest
		| GetSoundInfoByNameRequest
		| GetSpriteInfoByNameRequest
		| GetTexturePageInfoByIdRequest;
};

/* eslint-disable @typescript-eslint/no-duplicate-type-constituents */
export type AllResults =
	| ReadFileResult
	| SaveDataFileResult
	| DeleteDataFileResult
	| ListCodeEntriesResult
	| EditCodeTextByNameResult
	| GetCodeInfoByNameResult
	| GetEmbeddedAudioInfoByIdResult
	| GetEmbeddedTextureInfoByIdResult
	| GetEntriesByModelTypeResult
	| GetGameInfoResult
	| GetSoundInfoByNameResult
	| GetSpriteInfoByNameResult
	| GetTexturePageInfoByIdResult;
/* eslint-enable */

export type SpecificWorkerResponses<FinishedResult extends AllResults> =
	| {
			status: Exclude<
				WorkerStatuses,
				'MESSAGE_FROM_DOTNET' | 'FINISHED' | 'ERROR'
			>;
	  }
	| {
			status: 'MESSAGE_FROM_DOTNET';
			result: string;
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
