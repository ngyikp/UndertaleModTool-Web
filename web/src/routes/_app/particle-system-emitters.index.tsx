import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const particleSystemEmittersQueryOptions = queryOptions({
	queryKey: ['particle-system-emitters'],
	queryFn() {
		return getEntriesByModelType(ModelType.ParticleSystemEmitters);
	},
});

function ParticleSystemEmitters() {
	const {data} = useSuspenseQuery(particleSystemEmittersQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Particle system emitters" />

			<SortableList
				id="particle-system-emitters"
				emptyListMessage="This game has no particle system emitters."
				itemsAreNonUnique={true}
				list={data.list}
				onIndexPage={true}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/particle-system-emitters/')({
	component: ParticleSystemEmitters,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(particleSystemEmittersQueryOptions),
});
