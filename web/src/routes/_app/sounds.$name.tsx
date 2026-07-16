import {Stack, Title} from '@mantine/core';
import {queryOptions} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';

import BasicErrorAlert from '../../BasicErrorAlert';
import DocumentTitle from '../../DocumentTitle';

const soundQueryOptions = (name: string) =>
	queryOptions({
		queryKey: ['sounds', name],
		queryFn() {
			return name;
		},
	});

function RouteComponent() {
	const {name} = useParams({
		from: '/_app/sounds/$name',
	});

	// const {data} = useSuspenseQuery(soundQueryOptions(name));

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={[name, 'Sounds']} />
			<Title order={2}>{name}</Title>
			Sound content
		</Stack>
	);
}

export const Route = createFileRoute('/_app/sounds/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(soundQueryOptions(params.name)),
	errorComponent: ({error}) => {
		if (error.message === 'NoMatch') {
			return (
				<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
					<BasicErrorAlert title="This sound does not exist." />
				</Stack>
			);
		}

		throw error;
	},
});
