import {Alert} from '@mantine/core';

type Props = Readonly<{
	title?: string;
	error?: Error | null;
}>;

export default function BasicErrorAlert({title = 'Error', error}: Props) {
	return (
		<Alert variant="light" color="red" title={title}>
			{error?.message}
		</Alert>
	);
}
