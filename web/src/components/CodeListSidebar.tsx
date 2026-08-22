import {Checkbox} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {useChildMatches} from '@tanstack/react-router';

import getSortableListItemLinkProps from '../common/getSortableListItemLinkProps';
import MantineAnchorWithRouter from '../common/MantineAnchorWithRouter';
import SortableList from '../common/SortableList';
import {useDataStore} from '../data-store';
import {listCodeEntriesQueryOptions} from '../messages/listCodeEntries';

export default function CodeListSidebar() {
	const showChildEntries = useDataStore((state) => state.codeShowChildEntries);
	const setShowChildEntries = useDataStore(
		(state) => state.setCodeShowChildEntries,
	);

	const {data} = useSuspenseQuery(listCodeEntriesQueryOptions());

	const onIndexPage = useChildMatches().length === 0;

	return (
		<SortableList
			id="code"
			emptyListMessage="This game has no code entries."
			extraBelowItemCounts={
				<Checkbox
					checked={showChildEntries}
					onChange={(event) => {
						setShowChildEntries(event.currentTarget.checked);
					}}
					label="Show reference/anonymous functions"
					mb="xs"
					size="md"
				/>
			}
			getNameFromList={(item) => {
				return item.Name;
			}}
			list={data.list.filter((item) => {
				if (!showChildEntries && item.HasParentEntry) {
					return false;
				}

				return true;
			})}
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
	);
}
