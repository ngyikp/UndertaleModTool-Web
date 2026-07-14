import {Stack, Group, Loader, Alert, List} from '@mantine/core';
import {createFileRoute} from '@tanstack/react-router';
import {useState, useEffect} from 'react';

import {getCodeList} from '../../messages/getCodeList';
import type {WorkerStatuses} from '../../worker/WorkerMessageTypes';

function Code() {
	const [status, setStatus] = useState<WorkerStatuses | null>('LOADING');
	const [errorDetails, setErrorDetails] = useState<Error | null>(null);

	const [codeList, setCodeList] = useState<string[]>([]);

	useEffect(() => {
		getCodeList((response) => {
			setStatus(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED':
					setCodeList(response.result.list);
					break;

				case 'ERROR':
					console.error(response.errorDetails);
					setErrorDetails(new Error(response.errorDetails));
					break;

				default:
					break;
			}
		});
	}, []);

	return (
		<Stack>
			{status === 'LOADING' || status === 'PROCESSING' ? (
				<Group>
					<strong>Loading...</strong>
					<Loader size="sm" />
				</Group>
			) : status === 'ERROR' ? (
				<Alert
					variant="light"
					color="red"
					title="Oops, there was a problem loading the code"
				>
					{errorDetails ? <code>{errorDetails.message}</code> : null}
				</Alert>
			) : null}

			{codeList.length ? (
				<List>
					{codeList.map((code) => {
						return <List.Item key={code}>{code}</List.Item>;
					})}
				</List>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code/')({
	component: Code,
});
