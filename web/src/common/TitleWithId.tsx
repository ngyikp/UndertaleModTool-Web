import {Group, Title} from '@mantine/core';

type Props = Readonly<{
	id: number;
	name: string;
}>;

export default function TitleWithId({id, name}: Props) {
	return (
		<Group>
			<Title order={2} className="break-word" flex={1}>
				{name}
			</Title>

			<span>ID: {id}</span>
		</Group>
	);
}
