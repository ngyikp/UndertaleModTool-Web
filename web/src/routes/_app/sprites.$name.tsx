import {Pagination, Stack, Title} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';
import {useState} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import TexturePageImageViewer from '../../common/TexturePageImageViewer';
import {spriteInfoByNameQueryOptions} from '../../messages/getSpriteInfoByName';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function RouteComponent() {
	const name = useParams({
		from: '/_app/sprites/$name',
		select: (params) => params.name,
	});

	const {data} = useSuspenseQuery(spriteInfoByNameQueryOptions(name));

	const [page, setPage] = useState(1);
	const texturePage = data.TexturePageIDs[page - 1];

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={[name, 'Sprites']} />

			<Title order={2}>{name}</Title>

			{texturePage ? (
				<TexturePageImageViewer key={texturePage} texturePageId={texturePage} />
			) : null}

			{data.TexturePageIDs.length > 1 ? (
				<Pagination
					total={data.TexturePageIDs.length}
					value={page}
					onChange={setPage}
					py="md"
				/>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/sprites/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(
			spriteInfoByNameQueryOptions(params.name),
		),
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
