import {Divider, Stack, Text} from '@mantine/core';

import {useDataStore} from '../data-store';

export default function Footer() {
	const info = useDataStore((state) => state.gameInfo);

	return (
		<Stack>
			<Divider mt="xl" />

			{info?.UMTLibVersion != null ? (
				<Text c="dimmed">
					Running UndertaleModLib{' '}
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
				</Text>
			) : null}

			<Text c="dimmed">
				Powered by the UndertaleModTool project.{' '}
				<a
					href="https://github.com/ngyikp/UndertaleModTool-Web"
					target="_blank"
					// eslint-disable-next-line @eslint-react/dom-no-unsafe-target-blank
					rel="noopener"
				>
					Contribute on GitHub.
				</a>
			</Text>
		</Stack>
	);
}
