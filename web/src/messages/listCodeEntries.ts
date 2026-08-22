import {queryOptions} from '@tanstack/react-query';
import {z} from 'zod/mini';

import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type ListCodeEntriesRequest = {
	type: 'listCodeEntries';
	showChildEntries: boolean;
};

export type ListCodeEntriesResult = {
	list: CodeEntryListType;
};

// Keep this in sync with `src/Serializers/CodeEntry.cs`
export const CodeEntryListInfoSchema = z.array(
	z.object({
		Name: z.string(),
		HasParentEntry: z.boolean(),
	}),
);

type CodeEntryListType = z.infer<typeof CodeEntryListInfoSchema>;

function listCodeEntries(showChildEntries: boolean) {
	return sendMessageToWorkerAsPromise<ListCodeEntriesResult>({
		type: 'listCodeEntries',
		showChildEntries,
	});
}

export const listCodeEntriesQueryOptions = (showChildEntries: boolean) => {
	return queryOptions({
		queryKey: ['code', 'list', showChildEntries],
		queryFn() {
			return listCodeEntries(showChildEntries);
		},
	});
};
