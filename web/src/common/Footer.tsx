import {Divider, Stack, Text} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';

import {getDataFileLoadInfoQueryOptions} from '../messages/getDataFileLoadInfo';

import ExternalLinkInNewWindow from './ExternalLinkInNewWindow';

export default function Footer() {
	const {data: info} = useQuery(getDataFileLoadInfoQueryOptions());

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
