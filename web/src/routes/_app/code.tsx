import {Checkbox} from '@mantine/core';
import {createFileRoute, Outlet, useChildMatches} from '@tanstack/react-router';
import {Suspense} from 'react';

import BasicLoadingMessage from '../../common/BasicLoadingMessage';
import DocumentTitle from '../../common/DocumentTitle';
import SidebarAndContentView from '../../common/SidebarAndContentView';
import YycWarningAlert from '../../common/YycWarningAlert';
import CodeListSidebar from '../../components/CodeListSidebar';
import {useDataStore} from '../../data-store';
import {listCodeEntriesQueryOptions} from '../../messages/listCodeEntries';

function Code() {
	const info = useDataStore((state) => state.gameInfo);
	const showCodeEntries = useDataStore((state) => state.codeShowChildEntries);
	const setShowCodeEntries = useDataStore(
		(state) => state.setCodeShowChildEntries,
	);

	const onIndexPage = useChildMatches().length === 0;

	return (
		<>
			<DocumentTitle text="Code" />

			<Checkbox
				checked={showCodeEntries}
				onChange={(event) => {
					setShowCodeEntries(event.currentTarget.checked);
				}}
				label="Show reference/anonymous functions"
			/>

			{info?.IsYYC && info.ItemCounts.Code === 0 ? (
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
	loader: async ({context}) => {
		const showCodeEntries = useDataStore.getState().codeShowChildEntries;

		await context.queryClient.ensureQueryData(
			listCodeEntriesQueryOptions(showCodeEntries),
		);
	},
});
