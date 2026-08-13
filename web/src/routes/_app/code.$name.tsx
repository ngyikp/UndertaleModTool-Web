import {
	Alert,
	Button,
	Checkbox,
	Group,
	Popover,
	Title,
	Tooltip,
} from '@mantine/core';
import {useDisclosure, useHotkeys} from '@mantine/hooks';
import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query';
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
import isMac from '../../common/isMac';
import MonacoEditor from '../../common/monaco/MonacoEditor';
import {useDataStore} from '../../data-store';
import {useEditCodeTextByNameMutation} from '../../messages/editCodeTextByName';
import {codeInfoByNameQueryOptions} from '../../messages/getCodeInfoByName';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function RouteComponent() {
	const name = useParams({
		from: '/_app/code/$name',
		select: (params) => params.name,
	});

	const wordWrap = useDataStore((state) => state.codeEditorWordWrap);
	const setWordWrap = useDataStore((state) => state.setCodeEditorWordWrap);
	const [
		discardPopoverOpened,
		{close: closeDiscardPopover, toggle: toggleDiscardPopover},
	] = useDisclosure(false);

	const queryClient = useQueryClient();
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
		if (modifiedValue === originalCode) {
			return;
		}

		async function doSaveChanges() {
			if (!editCodeMutation.isPending) {
				closeDiscardPopover();

				await editCodeMutation.mutateAsync(modifiedValue);

				// Normally, this isn't needed as the code query becomes
				// invalidated and the query client will refetch
				//
				// However, there is edge case of saving modifiedValue
				// which compiles to the same as originalCode (due to
				// decompiler reformatting and removing comments),
				// so we need to set the editor value here
				const {DecompiledCode: newCode} = await queryClient.fetchQuery(
					codeInfoByNameQueryOptions(name),
				);
				if (newCode != null && newCode !== modifiedValue) {
					editorRef.current?.getModel()?.setValue(newCode);
				}
			}
		}

		// editCodeMutation has `isError`
		void doSaveChanges();
	}

	return (
		<ContentViewWithPadding>
			<DocumentTitle text={[name, 'Code']} />

			<Title order={2} className="break-word">
				{name}
			</Title>

			{data.ParentEntryName != null ? (
				<Alert variant="light" color="blue">
					This code entry is a reference to an anonymous function within{' '}
					<Link
						to="/code/$name"
						params={{name: data.ParentEntryName}}
						resetScroll={false}
					>
						{data.ParentEntryName}
					</Link>
					.
				</Alert>
			) : null}

			{originalCode != null ? (
				<>
					<Checkbox
						checked={wordWrap}
						onChange={(event) => {
							setWordWrap(event.currentTarget.checked);
						}}
						label="Word wrap"
					/>

					<Group gap="xs">
						<Button.Group mr="auto">
							<Tooltip label={isMac() ? 'Command-S' : 'Ctrl-S'}>
								<Button
									disabled={modifiedValue === originalCode}
									loading={editCodeMutation.isPending}
									onClick={saveChanges}
								>
									Save changes
								</Button>
							</Tooltip>

							<Popover
								opened={discardPopoverOpened}
								onDismiss={closeDiscardPopover}
								transitionProps={{transition: 'fade-down'}}
								trapFocus
								withArrow
							>
								<Popover.Target>
									<Button
										disabled={modifiedValue === originalCode}
										onClick={toggleDiscardPopover}
										variant="default"
									>
										Discard
									</Button>
								</Popover.Target>

								<Popover.Dropdown>
									<div>Discard all changes?</div>
									<Button
										onClick={() => {
											editorRef.current?.getModel()?.setValue(originalCode);
											editCodeMutation.reset();
											closeDiscardPopover();
										}}
										color="red"
										mt="sm"
									>
										Discard
									</Button>
								</Popover.Dropdown>
							</Popover>
						</Button.Group>

						<Button.Group>
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
						wordWrap={wordWrap}
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
