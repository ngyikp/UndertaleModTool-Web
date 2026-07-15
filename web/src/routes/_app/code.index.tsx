import {Stack} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';
import {createFileRoute, Link} from '@tanstack/react-router';

import BasicErrorAlert from '../../BasicErrorAlert';
import BasicLoadingMessage from '../../BasicLoadingMessage';
import DocumentTitle from '../../DocumentTitle';
import {getEntriesByModelType} from '../../messages/getEntriesByModelType';
import SortableList from '../../SortableList';
import {ModelType} from '../../types/ModelType';

function Code() {
	const {isPending, error, data} = useQuery({
		queryKey: ['code'],
		queryFn() {
			return getEntriesByModelType(ModelType.Code);
		},
	});

	return (
		<Stack>
			<DocumentTitle text="Code" />

			{isPending ? (
				<BasicLoadingMessage />
			) : error ? (
				<BasicErrorAlert
					title="Oops, there was a problem loading the code"
					error={error}
				/>
			) : null}

			<SortableList
				id="code"
				list={data?.list}
				render={(item) => {
					return (
						<Link to="/code/$name" params={{name: item}}>
							{item}
						</Link>
					);
				}}
			/>
		</Stack>
	);
}

export const Route = createFileRoute('/_app/code/')({
	component: Code,
});
