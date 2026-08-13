import {createTheme, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';

type Props = Readonly<{
	children: React.ReactNode;
}>;

const theme = createTheme({
	components: {
		Combobox: {
			defaultProps: {
				transitionProps: {transition: 'pop-top-left'},
			},
		},
		Popover: {
			defaultProps: {
				shadow: 'md',
				// no default transition as there can be many types of popovers
				// e.g. Menu/Combobox are also technically popovers
			},
		},
		Select: {
			defaultProps: {
				withAlignedLabels: true,
			},
		},
	},
	cursorType: 'pointer',
});

export default function CustomMantine({children}: Props) {
	return (
		<MantineProvider defaultColorScheme="auto" theme={theme}>
			{children}
		</MantineProvider>
	);
}
