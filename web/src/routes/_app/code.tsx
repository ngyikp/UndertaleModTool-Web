import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useMatchRoute,
} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SidebarAndContentView from '../../common/SidebarAndContentView';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const codeQueryOptions = queryOptions({
	queryKey: ['code'],
	queryFn() {
		return getEntriesByModelType(ModelType.Code);
	},
});

// Workaround React Compiler bug
// https://github.com/TanStack/router/issues/4499
function useIsOnIndexPage() {
	'use no memo';

	const matchRoute = useMatchRoute();
	return matchRoute({to: '/code'}) !== false;
}

function Code() {
	const {data} = useSuspenseQuery(codeQueryOptions);

	const onIndexPage = useIsOnIndexPage();

	return (
		<>
			<DocumentTitle text="Code" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="code"
						emptyListMessage="This game has no code entries." // todo could be better
						list={data.list}
						onIndexPage={onIndexPage}
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
				}
			/>
		</>
	);
}

export const Route = createFileRoute('/_app/code')({
	component: Code,
	loader: ({context}) => context.queryClient.ensureQueryData(codeQueryOptions),
});
