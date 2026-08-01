import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const particleSystemsQueryOptions = queryOptions({
	queryKey: ['particle-systems'],
	queryFn() {
		return getEntriesByModelType(ModelType.ParticleSystems);
	},
});

function ParticleSystems() {
	const {data} = useSuspenseQuery(particleSystemsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Particle systems" />

			<SortableList
				id="particle-systems"
				emptyListMessage="This game has no particle systems."
				list={data.list}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/particle-systems/')({
	component: ParticleSystems,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(particleSystemsQueryOptions),
});
