import {queryOptions} from '@tanstack/react-query';

import type {GameInfoType} from '../types/GameInfoType';
import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type GetGameInfoRequest = {
	type: 'getGameInfo';
};

export type GetGameInfoResult = GameInfoType;

function getGameInfo() {
	return sendMessageToWorkerAsPromise<GetGameInfoResult>({
		type: 'getGameInfo',
	});
}

export const getGameInfoQueryOptions = () =>
	queryOptions({
		queryKey: ['game-info'],
		queryFn() {
			try {
				return getGameInfo();
			} catch {
				return null;
			}
		},
	});
