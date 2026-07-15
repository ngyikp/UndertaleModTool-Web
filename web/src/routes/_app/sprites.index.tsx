import {Stack} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import BasicErrorAlert from '../../BasicErrorAlert';
import BasicLoadingMessage from '../../BasicLoadingMessage';
import DocumentTitle from '../../DocumentTitle';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import SortableList from '../../SortableList';
import {ModelType} from '../../types/ModelType';

function Sprites() {
	const {isPending, error, data} = useQuery({
		queryKey: ['sprites'],
		queryFn() {
			return getEntriesByModelType(ModelType.Sprites);
		},
	});

	return (
		<Stack>
			<DocumentTitle text="Sprites" />

			{isPending ? (
				<BasicLoadingMessage />
			) : error ? (
				<BasicErrorAlert
					title="Oops, there was a problem loading sprites"
					error={error}
				/>
			) : null}

			<SortableList
				id="sprites"
				list={data?.list}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/sprites/')({
	component: Sprites,
});
