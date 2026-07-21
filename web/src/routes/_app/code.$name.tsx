import {Alert, Button, CopyButton, Group, Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Link, useParams} from '@tanstack/react-router';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import GmlCodeHighlighter from '../../common/GmlCodeHighlighter';
import {getCodeInfoByName} from '../../messages/getCodeInfoByName';

const codeByNameQueryOptions = (name: string) =>
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

	const {data} = useSuspenseQuery(codeByNameQueryOptions(name));

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
				<>
					<Group gap="xs">
						<Button
							component="a"
							href={
								'data:text/plain;charset=utf-8,' +
								encodeURIComponent(data.DecompiledCode)
							}
							download={name + '.gml'}
						>
							Export code
						</Button>

						<CopyButton value={data.DecompiledCode}>
							{({copied, copy}) => (
								<Button color={copied ? 'teal' : undefined} onClick={copy}>
									{copied ? 'Copied' : 'Copy code'}
								</Button>
							)}
						</CopyButton>
					</Group>

					<GmlCodeHighlighter code={data.DecompiledCode} />
				</>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(codeByNameQueryOptions(params.name)),
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
