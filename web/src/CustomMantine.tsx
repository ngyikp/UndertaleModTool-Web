import {createTheme, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';

type Props = Readonly<{
	children: React.ReactNode;
}>;

const theme = createTheme({
	cursorType: 'pointer',
});

export default function CustomMantine({children}: Props) {
	return (
		<MantineProvider defaultColorScheme="auto" theme={theme}>
			{children}
		</MantineProvider>
	);
}
