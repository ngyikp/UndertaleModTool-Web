import {Divider, Stack, Text} from '@mantine/core';

import {useDataStore} from '../data-store';

import ExternalLinkInNewWindow from './ExternalLinkInNewWindow';

export default function Footer() {
	const info = useDataStore((state) => state.dataFileLoadInfo);

	return (
		<Stack>
			<Divider mt="xl" />

			<Text c="dimmed">
				Powered by the{' '}
				<ExternalLinkInNewWindow href="https://github.com/UnderminersTeam/UndertaleModTool">
					UndertaleModTool
				</ExternalLinkInNewWindow>{' '}
				project
				{info?.UMTLibVersion != null ? (
					<>
						{' (running '}
						<ExternalLinkInNewWindow
							href={
								'https://github.com/UnderminersTeam/UndertaleModTool/releases/tag/' +
								info.UMTLibVersion
							}
						>
							v{info.UMTLibVersion}
						</ExternalLinkInNewWindow>
						)
					</>
				) : null}
				.
			</Text>

			<Text c="dimmed">
				<ExternalLinkInNewWindow href="https://github.com/ngyikp/UndertaleModTool-Web">
					Contribute/report a bug for this web tool on GitHub
				</ExternalLinkInNewWindow>{' '}
				{BUILD_COMMIT_SHA != null
					? '(commit ' + BUILD_COMMIT_SHA.substring(0, 7) + ')'
					: null}
			</Text>
		</Stack>
	);
}
