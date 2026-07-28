import {useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useChildMatches,
} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SidebarAndContentView from '../../common/SidebarAndContentView';
import SortableList from '../../common/SortableList';
import YycWarningAlert from '../../common/YycWarningAlert';
import {useDataStore} from '../../data-store';
import codeQueryOptions from '../../queries/codeQueryOptions';

function Code() {
	const info = useDataStore((state) => state.gameInfo);

	const {data} = useSuspenseQuery(codeQueryOptions);

	const onIndexPage = useChildMatches().length === 0;

	return (
		<>
			<DocumentTitle text="Code" />

			<SidebarAndContentView
				onIndexPage={onIndexPage}
				content={<Outlet />}
				sidebar={
					<SortableList
						id="code"
						emptyListMessage={
							info?.IsYYC ? (
								<YycWarningAlert />
							) : (
								'This game has no code entries.'
							)
						}
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

export const Route = createFileRoute('/_app/code')({
	component: Code,
	loader: ({context}) => context.queryClient.ensureQueryData(codeQueryOptions),
});
