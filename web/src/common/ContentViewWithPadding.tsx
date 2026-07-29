import {Stack} from '@mantine/core';

type Props = Readonly<{
	children: React.ReactNode;
}>;

export default function ContentViewWithPadding({children}: Props) {
	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			{children}
		</Stack>
	);
}
