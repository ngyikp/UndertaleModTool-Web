import {Group, Loader} from '@mantine/core';

type Props = Readonly<{
	text?: string;
}>;

export default function BasicLoadingMessage({text = 'Loading...'}: Props) {
	return (
		<Group align="center">
			<strong>{text}</strong>
			<Loader size="sm" />
		</Group>
	);
}
