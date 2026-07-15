import {Alert} from '@mantine/core';

type Props = Readonly<{
	title?: string;
	error?: Error | null;
}>;

export default function BasicErrorAlert({
	title = 'Oops, something went wrong',
	error,
}: Props) {
	return (
		<Alert variant="light" color="red" title={title}>
			{error?.message}
		</Alert>
	);
}
