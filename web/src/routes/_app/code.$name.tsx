import {Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';

import GmlCodeHighlighter from '../../common/GmlCodeHighlighter';
import DocumentTitle from '../../DocumentTitle';
import {getCodeByName} from '../../messages/getCodeByName';

const codeQueryOptions = (name: string) =>
	queryOptions({
		queryKey: ['code', name],
		queryFn() {
			return getCodeByName(name);
		},
	});

function RouteComponent() {
	const {name} = useParams({
		from: '/_app/code/$name',
	});

	const {data} = useSuspenseQuery(codeQueryOptions(name));

	return (
		<Stack flex="1" style={{minWidth: 0}}>
			<DocumentTitle text={[name, 'Code']} />

			<Title order={2}>{name}</Title>

			{data.decompiledCode !== '' ? (
				<GmlCodeHighlighter code={data.decompiledCode} />
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(codeQueryOptions(params.name)),
});
