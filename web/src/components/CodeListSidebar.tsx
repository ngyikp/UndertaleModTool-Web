import {useSuspenseQuery} from '@tanstack/react-query';
import {useChildMatches} from '@tanstack/react-router';

import getSortableListItemLinkProps from '../common/getSortableListItemLinkProps';
import MantineAnchorWithRouter from '../common/MantineAnchorWithRouter';
import SortableList from '../common/SortableList';
import {useDataStore} from '../data-store';
import {listCodeEntriesQueryOptions} from '../messages/listCodeEntries';

export default function CodeListSidebar() {
	const showCodeEntries = useDataStore((state) => state.codeShowChildEntries);
	// const setShowCodeEntries = useDataStore(
	// 	(state) => state.setCodeShowChildEntries,
	// );

	const {data} = useSuspenseQuery(listCodeEntriesQueryOptions(showCodeEntries));

	const onIndexPage = useChildMatches().length === 0;

	return (
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
	);
}
