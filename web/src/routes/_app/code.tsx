import {useSuspenseQuery} from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	Outlet,
	useChildMatches,
} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import getSortableListItemLinkProps from '../../common/getSortableListItemLinkProps';
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

			{info?.IsYYC && data.list.length === 0 ? (
				<YycWarningAlert />
			) : (
				<SidebarAndContentView
					onIndexPage={onIndexPage}
					content={<Outlet />}
					sidebar={
						<SortableList
							id="code"
							emptyListMessage="This game has no code entries."
							list={data.list}
							onIndexPage={onIndexPage}
							render={(item, searchHighlight) => {
								return (
									<Link
										to="/code/$name"
										params={{name: item}}
										{...getSortableListItemLinkProps(item, searchHighlight)}
									/>
								);
							}}
						/>
					}
				/>
			)}
		</>
	);
}

export const Route = createFileRoute('/_app/code')({
	component: Code,
	loader: ({context}) => context.queryClient.ensureQueryData(codeQueryOptions),
});
