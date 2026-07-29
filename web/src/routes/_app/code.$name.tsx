import {Alert, Button, Group, Title} from '@mantine/core';
import {useHotkeys} from '@mantine/hooks';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Link, useParams} from '@tanstack/react-router';
import type * as monaco from 'monaco-editor/editor/editor.api';
import {useRef, useState} from 'react';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewLoading from '../../common/ContentViewLoading';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import CustomCopyButton from '../../common/CustomCopyButton';
import DocumentTitle from '../../common/DocumentTitle';
// import GmlCodeHighlighter from '../../common/GmlCodeHighlighter';
import MonacoEditor from '../../common/MonacoEditor';
import {useEditCodeTextByNameMutation} from '../../messages/editCodeTextByName';
import {codeInfoByNameQueryOptions} from '../../messages/getCodeInfoByName';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function RouteComponent() {
	const name = useParams({
		from: '/_app/code/$name',
		select: (params) => params.name,
	});

	const {data} = useSuspenseQuery(codeInfoByNameQueryOptions(name));
	const editCodeMutation = useEditCodeTextByNameMutation(name);

	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

	const originalCode = data.DecompiledCode;
	const [modifiedValue, setModifiedValue] = useState(originalCode ?? '');

	const [prevOriginalCode, setPrevOriginalCode] = useState(originalCode);
	if (originalCode !== prevOriginalCode) {
		setModifiedValue(originalCode ?? '');
		setPrevOriginalCode(originalCode);
	}

	useHotkeys([['mod + s', saveChanges]]);

	function saveChanges() {
		if (!editCodeMutation.isPending) {
			editCodeMutation.mutate(modifiedValue);
		}
	}

	return (
		<ContentViewWithPadding>
			<DocumentTitle text={[name, 'Code']} />

			<Title order={2}>{name}</Title>

			{data.ParentEntryName != null ? (
				<Alert variant="light" color="blue">
					This code entry is a reference to an anonymous function within{' '}
					<Link to="/code/$name" params={{name: data.ParentEntryName}}>
						{data.ParentEntryName}
					</Link>
					.
				</Alert>
			) : null}

			{originalCode != null ? (
				<>
					<Group gap="xs">
						<Button.Group>
							<Button
								// todo if the code formatting after saving is different, the button is not disabled
								// disabled={modifiedValue === originalCode}
								loading={editCodeMutation.isPending}
								onClick={saveChanges}
							>
								Save changes
							</Button>

							<Button
								// disabled={modifiedValue === originalCode}
								onClick={() => {
									editorRef.current?.getModel()?.setValue(originalCode);
									editCodeMutation.reset();
								}}
								variant="default"
							>
								Revert
							</Button>
						</Button.Group>

						<Button.Group ml="auto">
							<Button
								component="a"
								href={
									'data:text/plain;charset=utf-8,' +
									// todo performance?
									encodeURIComponent(modifiedValue)
								}
								download={name + '.gml'}
								variant="default"
							>
								Export code
							</Button>

							<CustomCopyButton label="Copy code" value={modifiedValue} />
						</Button.Group>
					</Group>

					{editCodeMutation.isError ? (
						<div style={{flexShrink: 0}}>
							<BasicErrorAlert
								title="Cannot save code"
								error={editCodeMutation.error}
							/>
						</div>
					) : null}

					{/* <GmlCodeHighlighter code={originalCode} /> */}

					<MonacoEditor
						defaultValue={originalCode}
						editorRef={editorRef}
						onValueChange={setModifiedValue}
					/>
				</>
			) : null}
		</ContentViewWithPadding>
	);
}

export const Route = createFileRoute('/_app/code/$name')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(
			codeInfoByNameQueryOptions(params.name),
		),
	errorComponent({error}) {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message === 'NoMatch') {
				return <ContentViewAlert title="This code name does not exist." />;
			}
		}

		return <ContentViewAlert error={error} />;
	},
	pendingComponent: () => <ContentViewLoading text="Loading code..." />,
});
