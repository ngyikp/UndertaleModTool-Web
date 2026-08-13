import {Stack, Title} from '@mantine/core';

import Footer from './Footer';

type Props = Readonly<{
	children: React.ReactNode;
}>;

export default function GenericHeaderAndFooter({children}: Props) {
	return (
		<Stack>
			<Title>UndertaleModTool on the Web</Title>

			{children}

			<Footer />
		</Stack>
	);
}
