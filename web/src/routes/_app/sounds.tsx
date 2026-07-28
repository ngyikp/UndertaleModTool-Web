import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useChildMatches,
} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SidebarAndContentView from '../../common/SidebarAndContentView';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const soundsQueryOptions = queryOptions({
	queryKey: ['sounds'],
	queryFn() {
		return getEntriesByModelType(ModelType.Sounds);
	},
});

function Sounds() {
	const {data} = useSuspenseQuery(soundsQueryOptions);

	const onIndexPage = useChildMatches().length === 0;

	return (
		<>
			<DocumentTitle text="Sounds" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="sounds"
						emptyListMessage="This game has no sounds."
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
									resetScroll={false}
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
