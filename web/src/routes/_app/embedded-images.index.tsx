import {Stack} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import DocumentTitle from '../../common/DocumentTitle';
import SortableList from '../../common/SortableList';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import {ModelType} from '../../types/ModelType';

const embeddedImagesQueryOptions = queryOptions({
	queryKey: ['embedded-images'],
	queryFn() {
		return getEntriesByModelType(ModelType.EmbeddedImages);
	},
});

function EmbeddedImages() {
	const {data} = useSuspenseQuery(embeddedImagesQueryOptions);

	return (
		<Stack>
			<DocumentTitle text="Embedded images" />

			<SortableList
				id="embedded-images"
				emptyListMessage="This game has no embedded images."
				list={data.list}
				onIndexPage={true}
				render={(item) => {
					return item;
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/embedded-images/')({
	component: EmbeddedImages,
	loader: ({context}) =>
		context.queryClient.ensureQueryData(embeddedImagesQueryOptions),
});
