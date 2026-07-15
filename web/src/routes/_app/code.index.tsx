import {Stack, Group, Loader, Alert, List} from '@mantine/core';
import {createFileRoute, Link} from '@tanstack/react-router';
import {useState, useEffect} from 'react';

import {useDataStore} from '../../data-store';
import {getCodeList} from '../../messages/getCodeList';
import type {WorkerStatuses} from '../../worker/WorkerMessageTypes';

function Code() {
	const hasLoaded = useDataStore((state) => state.code.hasLoaded);
	const codeEntries = useDataStore((state) => state.code.entries);
	const replaceCodeEntries = useDataStore((state) => state.replaceCodeEntries);

	const [status, setStatus] = useState<WorkerStatuses | null>(
		!hasLoaded ? 'LOADING' : null,
	);
	const [errorDetails, setErrorDetails] = useState<Error | null>(null);

	useEffect(() => {
		if (status !== 'LOADING') {
			return;
		}

		getCodeList((response) => {
			setStatus(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED': {
					const map = new Map<string, string>();
					for (const name of response.result.list) {
						map.set(name, '');
					}
					replaceCodeEntries(map);
					break;
				}

				case 'ERROR':
					console.error(response.errorDetails);
					setErrorDetails(new Error(response.errorDetails));
					break;

				default:
					break;
			}
		});
	}, [replaceCodeEntries, status]);

	const listItems = [];
	if (codeEntries.size > 0) {
		for (const [name] of codeEntries) {
			listItems.push(
				<List.Item key={name}>
					<Link to="/code/$name" params={{name}}>
						{name}
					</Link>
				</List.Item>,
			);
		}
	}

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

			{listItems.length ? <List>{listItems}</List> : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code/')({
	component: Code,
});
