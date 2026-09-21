import {Checkbox, List, Table, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';

import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewLoading from '../../common/ContentViewLoading';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import DocumentTitle from '../../common/DocumentTitle';
import TitleWithId from '../../common/TitleWithId';
import {useDataStore} from '../../data-store';
import {
	getExtensionInfoByName,
	OptionKindValues,
} from '../../messages/getExtensionInfoByName';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

const extensionByNameQueryOptions = (name: string) =>
	queryOptions({
		queryKey: ['extensions', name],
		queryFn() {
			return getExtensionInfoByName(name);
		},
	});

function RouteComponent() {
	const name = useParams({
		from: '/_app/extensions/$name',
		select: (params) => params.name,
	});

	const showRawValues = useDataStore((state) => state.extensionShowRawValues);
	const setShowRawValues = useDataStore(
		(state) => state.setExtensionShowRawValues,
	);

	const {data} = useSuspenseQuery(extensionByNameQueryOptions(name));
	const {
		Id: id,
		Version: version,
		FileNames: fileNames,
		Options: options,
	} = data;

	return (
		<ContentViewWithPadding>
			<DocumentTitle text={[name, 'Extensions']} />

			<TitleWithId id={id} name={name} />

			{version != null ? <p>Version: {version}</p> : null}

			{/* todo show more detail about each file */}
			{fileNames.length ? (
				<>
					<Title order={3}>Files</Title>

					<List>
						{fileNames.map((fileName) => {
							return <List.Item key={fileName}>{fileName}</List.Item>;
						})}
					</List>
				</>
			) : null}

			{options.length ? (
				<>
					<Title order={3}>Options</Title>

					<Checkbox
						checked={showRawValues}
						onChange={(event) => {
							setShowRawValues(event.currentTarget.checked);
						}}
						label="Show raw values"
					/>

					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Name</Table.Th>
								<Table.Th>Value</Table.Th>
								<Table.Th>Kind</Table.Th>
							</Table.Tr>
						</Table.Thead>

						<Table.Tbody>
							{options.map((option) => {
								return (
									<Table.Tr key={option.Name}>
										<Table.Td>{option.Name}</Table.Td>
										<Table.Td className="break-word">
											{showRawValues ? option.Value : atob(option.Value)}
										</Table.Td>
										<Table.Td>{OptionKindValues[option.Kind]}</Table.Td>
									</Table.Tr>
								);
							})}
						</Table.Tbody>
					</Table>
				</>
			) : null}
		</ContentViewWithPadding>
	);
}

export const Route = createFileRoute('/_app/extensions/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.query(extensionByNameQueryOptions(params.name)),
	errorComponent({error}) {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message.startsWith('ArgumentOutOfRange_IndexMustBeLess')) {
				return <ContentViewAlert title="This extension does not exist." />;
			}
		}

		return <ContentViewAlert error={error} />;
	},
	pendingComponent: () => <ContentViewLoading text="Loading extension..." />,
});
