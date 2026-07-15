import {Flex, Stack} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useMatchRoute,
} from '@tanstack/react-router';

import BasicErrorAlert from '../../BasicErrorAlert';
import BasicLoadingMessage from '../../BasicLoadingMessage';
import DocumentTitle from '../../DocumentTitle';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import SortableList from '../../SortableList';
import {ModelType} from '../../types/ModelType';

function Code() {
	const {isPending, error, data} = useQuery({
		queryKey: ['code'],
		queryFn() {
			return getEntriesByModelType(ModelType.Code);
		},
	});

	const matchRoute = useMatchRoute();
	const onIndexPage = matchRoute({to: '/code'}) !== false;

	return (
		<Stack>
			<DocumentTitle text="Code" />

			<Flex gap="md">
				<Stack flex={onIndexPage ? 1 : undefined}>
					{isPending ? (
						<BasicLoadingMessage />
					) : error ? (
						<BasicErrorAlert
							title="Oops, there was a problem loading the code"
							error={error}
						/>
					) : null}

					<SortableList
						id="code"
						list={data?.list}
						render={(item) => {
							return (
								<Link
									to="/code/$name"
									params={{name: item}}
									activeProps={{style: {fontWeight: 'bold'}}}
								>
									{item}
								</Link>
							);
						}}
					/>
				</Stack>

				<Outlet />
			</Flex>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code')({
	component: Code,
});
