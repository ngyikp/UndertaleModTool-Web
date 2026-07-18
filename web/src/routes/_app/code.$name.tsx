import {Alert, Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Link, useParams} from '@tanstack/react-router';

import BasicErrorAlert from '../../BasicErrorAlert';
import GmlCodeHighlighter from '../../common/GmlCodeHighlighter';
import DocumentTitle from '../../DocumentTitle';
import {getCodeInfoByName} from '../../messages/getCodeInfoByName';

const codeQueryOptions = (name: string) =>
	queryOptions({
		queryKey: ['code', name],
		queryFn() {
			return getCodeInfoByName(name);
		},
	});

function RouteComponent() {
	const {name} = useParams({
		from: '/_app/code/$name',
	});

	const {data} = useSuspenseQuery(codeQueryOptions(name));

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={[name, 'Code']} />

			<Title order={2}>{name}</Title>

			{data.ParentEntryName != null ? (
				<Alert variant="light" color="blue">
					This code entry is a reference to an anonymous function within{' '}
					<Link to="/code/$name" params={{name: data.ParentEntryName}}>
						{data.ParentEntryName}
					</Link>
					.
				</Alert>
			) : null}

			{data.DecompiledCode != null ? (
				<GmlCodeHighlighter code={data.DecompiledCode} />
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(codeQueryOptions(params.name)),
	errorComponent: ({error}) => {
		if (error.message === 'NoMatch') {
			return (
				<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
					<BasicErrorAlert title="This code name does not exist." />
				</Stack>
			);
		}

		throw error;
	},
});
