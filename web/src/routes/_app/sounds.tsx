import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useMatchRoute,
} from '@tanstack/react-router';

import SidebarAndContentView from '../../common/SidebarAndContentView';
import SortableList from '../../common/SortableList';
import DocumentTitle from '../../DocumentTitle';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const soundsQueryOptions = queryOptions({
	queryKey: ['sounds'],
	queryFn() {
		return getEntriesByModelType(ModelType.Sounds);
	},
});

// Workaround React Compiler bug
// https://github.com/TanStack/router/issues/4499
function useIsOnIndexPage() {
	'use no memo';

	const matchRoute = useMatchRoute();
	return matchRoute({to: '/sounds'}) !== false;
}

function Sounds() {
	const {data} = useSuspenseQuery(soundsQueryOptions);

	const onIndexPage = useIsOnIndexPage();

	return (
		<>
			<DocumentTitle text="Sounds" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="sounds"
						list={data.list}
						onIndexPage={onIndexPage}
						render={(item) => {
							return (
								<Link
									to="/sounds/$name"
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

export const Route = createFileRoute('/_app/sounds')({
	component: Sounds,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(soundsQueryOptions),
});
