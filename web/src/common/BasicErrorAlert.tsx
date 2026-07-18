import {Alert} from '@mantine/core';

type Props = Readonly<{
	title?: string;
	error?: string | Error | null;
}>;

export default function BasicErrorAlert({
	title = 'Oops, something went wrong',
	error,
}: Props) {
	return (
		<Alert
			variant="light"
			color="red"
			title={title}
			style={{alignSelf: 'start'}}
		>
			{typeof error === 'string' ? error : error?.message}
		</Alert>
	);
}
