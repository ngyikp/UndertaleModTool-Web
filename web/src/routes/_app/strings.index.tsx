import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import renderSearchHighlight from '../../common/renderSearchHighlight';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

import styles from './strings.module.css';

const stringsQueryOptions = queryOptions({
	queryKey: ['strings'],
	queryFn() {
		return getEntriesByModelType(ModelType.Strings);
	},
});

function Strings() {
	const {data} = useSuspenseQuery(stringsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Strings" />

			<SortableList
				id="strings"
				emptyListMessage="This game has no strings."
				list={data.list}
				onIndexPage={true}
				render={({text, searchHighlight}) => {
					return (
						<span className={styles.item}>
							{renderSearchHighlight({text, searchHighlight})}
						</span>
					);
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/strings/')({
	component: Strings,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(stringsQueryOptions),
});
