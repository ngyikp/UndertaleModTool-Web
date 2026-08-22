import {Checkbox} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Outlet, useChildMatches} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import getSortableListItemLinkProps from '../../common/getSortableListItemLinkProps';
import MantineAnchorWithRouter from '../../common/MantineAnchorWithRouter';
import SidebarAndContentView from '../../common/SidebarAndContentView';
import SortableList from '../../common/SortableList';
import YycWarningAlert from '../../common/YycWarningAlert';
import {useDataStore} from '../../data-store';
import {listCodeEntriesQueryOptions} from '../../messages/listCodeEntries';

function Code() {
	const info = useDataStore((state) => state.gameInfo);
	const showCodeEntries = useDataStore((state) => state.codeShowChildEntries);
	const setShowCodeEntries = useDataStore(
		(state) => state.setCodeShowChildEntries,
	);

	const {data} = useSuspenseQuery(listCodeEntriesQueryOptions(showCodeEntries));

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
							getNameFromList={(item) => {
								return item.Name;
							}}
							list={data.list}
							onIndexPage={onIndexPage}
							render={({item, text, searchHighlight}) => {
								return (
									<MantineAnchorWithRouter
										to="/code/$name"
										params={{name: text}}
										c={item.HasParentEntry ? 'dimmed' : undefined}
										{...getSortableListItemLinkProps(text, searchHighlight)}
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
	loader: ({context}) =>
		// todo can this true not be hardcoded?
		context.queryClient.ensureQueryData(listCodeEntriesQueryOptions(true)),
});
