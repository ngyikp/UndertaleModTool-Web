import {Divider, Stack, Text} from '@mantine/core';

import {useDataStore} from '../data-store';

export default function Footer() {
	const info = useDataStore((state) => state.gameInfo);

	return (
		<Stack>
			<Divider mt="xl" />

			<Text c="dimmed">
				Powered by the{' '}
				<a
					href="https://github.com/UnderminersTeam/UndertaleModTool"
					target="_blank"
					// eslint-disable-next-line @eslint-react/dom-no-unsafe-target-blank
					rel="noopener"
				>
					UndertaleModTool
				</a>{' '}
				project
				{info?.UMTLibVersion != null ? (
					<>
						{' (running '}
						<a
							href={
								'https://github.com/UnderminersTeam/UndertaleModTool/releases/tag/' +
								info.UMTLibVersion
							}
							target="_blank"
							rel="noopener"
						>
							v{info.UMTLibVersion}
						</a>
						)
					</>
				) : null}
				.
			</Text>

			<Text c="dimmed">
				<a
					href="https://github.com/ngyikp/UndertaleModTool-Web"
					target="_blank"
					// eslint-disable-next-line @eslint-react/dom-no-unsafe-target-blank
					rel="noopener"
				>
					Contribute/report a bug for this web version on GitHub.
				</a>
			</Text>
		</Stack>
	);
}
