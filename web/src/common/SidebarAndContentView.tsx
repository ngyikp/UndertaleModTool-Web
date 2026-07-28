import {Flex} from '@mantine/core';

import styles from './SidebarAndContentView.module.css';

type Props = Readonly<{
	onIndexPage: boolean;
	sidebarWidth?: number;

	content: React.ReactNode;
	sidebar: React.ReactNode;
}>;

// On the index page, the sidebar will be expanded full
// Otherwise, the sidebar will be resized smaller
export default function SidebarAndContentView({
	onIndexPage,
	sidebarWidth = 350,
	content,
	sidebar,
}: Props) {
	return (
		<Flex gap="md" mt={onIndexPage ? undefined : '-md'} mb="-lg">
			<Flex
				flex={onIndexPage ? 1 : undefined}
				style={{width: onIndexPage ? undefined : sidebarWidth}}
				className={[
					styles.sidebar,
					onIndexPage ? styles.sidebarOnIndexPage : styles.sticky,
				].join(' ')}
			>
				{sidebar}
			</Flex>

			{content}
		</Flex>
	);
}
