import {useMutation, useQueryClient} from '@tanstack/react-query';

import codeQueryOptions from '../queries/codeQueryOptions';
import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

export type EditCodeTextByNameRequest = {
	type: 'editCodeTextByName';
	name: string;
	sourceCode: string;
};

// todo something else?
export type EditCodeTextByNameResult = true;

export const useEditCodeTextByNameMutation = (name: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ['code', 'edit-text', name],
		mutationFn(sourceCode: string) {
			return sendMessageToWorkerAsPromise<EditCodeTextByNameResult>({
				type: 'editCodeTextByName',
				name,
				sourceCode,
			});
		},
		onSuccess() {
			// need to invalidate every `code` queryKey since you could rename functions
			void queryClient.invalidateQueries(codeQueryOptions);
		},
		gcTime: 1000,
	});
};
