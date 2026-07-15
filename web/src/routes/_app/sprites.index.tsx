import {List, Stack} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import BasicErrorAlert from '../../BasicErrorAlert';
import BasicLoadingMessage from '../../BasicLoadingMessage';
import DocumentTitle from '../../DocumentTitle';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

function Sprites() {
	const {isPending, error, data} = useQuery({
		queryKey: ['sprites'],
		queryFn() {
			return getEntriesByModelType(ModelType.Sprites);
		},
	});

	const list = data?.list ?? [];

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

			{list.length ? (
				<List>
					{list.map((entry) => {
						return <List.Item key={entry}>{entry}</List.Item>;
					})}
				</List>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/sprites/')({
	component: Sprites,
});
