import {Stack, Title} from '@mantine/core';
import {createFileRoute, useParams} from '@tanstack/react-router';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

// const spriteByNameQueryOptions = (name: string) =>
// 	queryOptions({
// 		queryKey: ['sprites', name],
// 		queryFn() {
// 			return getSpriteInfoByName(name);
// 		},
// 	});

function RouteComponent() {
	const name = useParams({
		from: '/_app/sprites/$name',
		select: (params) => params.name,
	});

	// const {data} = useSuspenseQuery(spriteByNameQueryOptions(name));

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={[name, 'Sprites']} />

			<Title order={2}>{name}</Title>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/sprites/$name')({
	component: RouteComponent,
	// loader: ({context, params}) =>
	// 	context.queryClient.ensureQueryData(spriteByNameQueryOptions(params.name)),
	errorComponent: ({error}) => {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message === 'NoMatch') {
				return (
					<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
						<BasicErrorAlert title="This sprite does not exist." />
					</Stack>
				);
			}
		}

		throw error;
	},
});
