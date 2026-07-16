import {Stack, Title} from '@mantine/core';
import {createFileRoute, useParams} from '@tanstack/react-router';

import BasicErrorAlert from '../../BasicErrorAlert';
import DocumentTitle from '../../DocumentTitle';

// const embeddedTexturesQueryOptions = (name: string) =>
// 	queryOptions({
// 		queryKey: ['embedded-textures', name],
// 		queryFn() {
// 			return getSoundDataByName(name);
// 		},
// 	});

function RouteComponent() {
	const {id} = useParams({
		from: '/_app/embedded-textures/$id',
	});

	// const {data} = useSuspenseQuery(embeddedTexturesQueryOptions(name));

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={['Texture ' + id, 'Embedded textures']} />

			<Title order={2}>Texture {id}</Title>

			<p>Content</p>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/embedded-textures/$id')({
	component: RouteComponent,
	// loader: ({context, params}) =>
	// 	context.queryClient.ensureQueryData(
	// 		embeddedTexturesQueryOptions(params.name),
	// 	),
	errorComponent: ({error}) => {
		if (error.message === 'NoMatch') {
			return (
				<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
					<BasicErrorAlert title="This embedded texture does not exist." />
				</Stack>
			);
		}

		throw error;
	},
});
