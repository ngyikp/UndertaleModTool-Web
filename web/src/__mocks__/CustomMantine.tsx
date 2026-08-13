import {HeadlessMantineProvider} from '@mantine/core';

type Props = Readonly<{
	children: React.ReactNode;
}>;

export default function CustomMantine({children}: Props) {
	return (
		<HeadlessMantineProvider
			env={import.meta.env.MODE === 'test' ? 'test' : undefined}
		>
			{children}
		</HeadlessMantineProvider>
	);
}
