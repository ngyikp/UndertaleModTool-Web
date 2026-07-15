import {Stack, Group, Loader, Alert, List} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {createFileRoute, Link} from '@tanstack/react-router';

import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

function Code() {
	const {
		isPending,
		error,
		data: codeEntries,
	} = useQuery<Map<string, string>>({
		queryKey: ['code'],
		queryFn: () => {
			// todo clean up
			return new Promise((resolve, reject) => {
				getEntriesByModelType(ModelType.Code, (response) => {
					switch (response.status) {
						case 'FINISHED': {
							const map = new Map<string, string>();
							for (const name of response.result.list) {
								map.set(name, '');
							}
							resolve(map);
							break;
						}

						case 'ERROR':
							reject(new Error(response.errorDetails));
							break;

						default:
							break;
					}
				});
			});
		},
	});

	const listItems = [];
	if (codeEntries && codeEntries.size > 0) {
		for (const [name] of codeEntries) {
			listItems.push(
				<List.Item key={name}>
					<Link to="/code/$name" params={{name}}>
						{name}
					</Link>
				</List.Item>,
			);
		}
	}

	return (
		<Stack>
			{isPending ? (
				<Group>
					<strong>Loading...</strong>
					<Loader size="sm" />
				</Group>
			) : error ? (
				<Alert
					variant="light"
					color="red"
					title="Oops, there was a problem loading the code"
				>
					{error.message}
				</Alert>
			) : null}

			{listItems.length ? <List>{listItems}</List> : null}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code/')({
	component: Code,
});
