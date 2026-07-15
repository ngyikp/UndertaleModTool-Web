import {Flex, Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useMatchRoute,
} from '@tanstack/react-router';

import DocumentTitle from '../../DocumentTitle';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import SortableList from '../../SortableList';
import {ModelType} from '../../types/ModelType';

const codeQueryOptions = queryOptions({
	queryKey: ['code'],
	queryFn() {
		return getEntriesByModelType(ModelType.Code);
	},
});

function Code() {
	const {data} = useSuspenseQuery(codeQueryOptions);

	const matchRoute = useMatchRoute();
	const onIndexPage = matchRoute({to: '/code'}) !== false;

	return (
		<>
			<DocumentTitle text="Code" />

			<Flex gap="md">
				<Stack flex={onIndexPage ? 1 : undefined}>
					<SortableList
						id="code"
						list={data.list}
						render={(item) => {
							return (
								<Link
									to="/code/$name"
									params={{name: item}}
									preload="intent"
									preloadDelay={250}
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
		</>
	);
}

export const Route = createFileRoute('/_app/code')({
	component: Code,
	loader: ({context}) => context.queryClient.ensureQueryData(codeQueryOptions),
});
