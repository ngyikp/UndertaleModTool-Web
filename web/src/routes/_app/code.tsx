import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Outlet, useChildMatches} from '@tanstack/react-router';
import {Suspense} from 'react';

import BasicLoadingMessage from '../../common/BasicLoadingMessage';
import DocumentTitle from '../../common/DocumentTitle';
import SidebarAndContentView from '../../common/SidebarAndContentView';
import YycWarningAlert from '../../common/YycWarningAlert';
import CodeListSidebar from '../../components/CodeListSidebar';
import {getGameInfoQueryOptions} from '../../messages/getGameInfo';
import {listCodeEntriesQueryOptions} from '../../messages/listCodeEntries';

function Code() {
	const onIndexPage = useChildMatches().length === 0;

	const {data: gameInfo} = useSuspenseQuery(getGameInfoQueryOptions());

	return (
		<>
			<DocumentTitle text="Code" />

			{gameInfo?.IsYYC && gameInfo.ItemCounts.Code === 0 ? (
				<YycWarningAlert />
			) : (
				<SidebarAndContentView
					onIndexPage={onIndexPage}
					content={<Outlet />}
					sidebar={
						<Suspense fallback={<BasicLoadingMessage />}>
							<CodeListSidebar />
						</Suspense>
					}
				/>
			)}
		</>
	);
}

export const Route = createFileRoute('/_app/code')({
	component: Code,
	loader: ({context}) =>
		context.queryClient.query(listCodeEntriesQueryOptions()),
});
