import {useMutation, useQueryClient} from '@tanstack/react-query';

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
			// eslint-disable-next-line @tanstack/query/prefer-query-options
			void queryClient.invalidateQueries({queryKey: ['code']});
		},
		gcTime: 1000,
	});
};
