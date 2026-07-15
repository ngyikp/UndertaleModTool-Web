import {List, Stack} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {createFileRoute, Link} from '@tanstack/react-router';

import BasicErrorAlert from '../../BasicErrorAlert';
import BasicLoadingMessage from '../../BasicLoadingMessage';
import DocumentTitle from '../../DocumentTitle';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

function Code() {
	const {isPending, error, data} = useQuery({
		queryKey: ['code'],
		queryFn() {
			return getEntriesByModelType(ModelType.Code);
		},
	});

	const list = data?.list ?? [];

	return (
		<Stack>
			<DocumentTitle text="Code" />

			{isPending ? (
				<BasicLoadingMessage />
			) : error ? (
				<BasicErrorAlert
					title="Oops, there was a problem loading the code"
					error={error}
				/>
			) : null}

			{list.length ? (
				<List>
					{list.map((entry) => {
						return (
							<List.Item key={entry}>
								<Link to="/code/$name" params={{name: entry}}>
									{entry}
								</Link>
							</List.Item>
						);
					})}
				</List>
			) : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code/')({
	component: Code,
});
