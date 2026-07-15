import {Alert, Group, Loader, Stack, Title} from '@mantine/core';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useEffect, useState} from 'react';

import GmlCodeHighlighter from '../../common/GmlCodeHighlighter';
import DocumentTitle from '../../DocumentTitle';
import {getCodeByName} from '../../messages/getCodeByName';
import type {WorkerStatuses} from '../../worker/WorkerMessageTypes';

function RouteComponent() {
	const [status, setStatus] = useState<WorkerStatuses | null>('LOADING');
	const [errorDetails, setErrorDetails] = useState<Error | null>(null);

	const {name} = useParams({
		from: '/_app/code/$name',
	});

	const [decompiledCode, setDecompiledCode] = useState('');

	useEffect(() => {
		getCodeByName(name, (response) => {
			setStatus(response.status);
			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED':
					setDecompiledCode(response.result.decompiledCode);
					break;

				case 'ERROR':
					console.error(response.errorDetails);
					setErrorDetails(new Error(response.errorDetails));
					break;

				default:
					break;
			}
		});
	}, [name]);

	return (
		<Stack flex="1">
			<DocumentTitle text={[name, 'Code']} />

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

			<Title order={2}>{name}</Title>

			{decompiledCode !== '' ? (
				<GmlCodeHighlighter code={decompiledCode} />
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code/$name')({
	component: RouteComponent,
});
