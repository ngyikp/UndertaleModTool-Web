import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Link} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import renderSearchHighlight from '../../common/renderSearchHighlight';
import SortableList from '../../common/SortableList';
import YycWarningAlert from '../../common/YycWarningAlert';
import {useDataStore} from '../../data-store';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const globalInitScriptsQueryOptions = queryOptions({
	queryKey: ['global-init'],
	queryFn() {
		return getEntriesByModelType(ModelType.GlobalInitScripts);
	},
});

function GlobalInitScripts() {
	const info = useDataStore((state) => state.gameInfo);

	const {data} = useSuspenseQuery(globalInitScriptsQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Global init scripts" />

			<SortableList
				id="global-init"
				emptyListMessage={
					info?.IsYYC ? (
						<YycWarningAlert />
					) : (
						'This game has no global init scripts.'
					)
				}
				list={data.list}
				onIndexPage={true}
				render={({text, searchHighlight}) => {
					return (
						<Link
							to="/code/$name"
							params={{name: text}}
							preload="intent"
							preloadDelay={250}
						>
							{renderSearchHighlight({text, searchHighlight})}
						</Link>
					);
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/global-init')({
	component: GlobalInitScripts,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(globalInitScriptsQueryOptions),
});
