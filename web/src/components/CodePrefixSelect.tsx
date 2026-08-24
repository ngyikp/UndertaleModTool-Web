import {Button, Group, Select} from '@mantine/core';
import {useId} from '@mantine/hooks';
import {useQuery} from '@tanstack/react-query';
import {Link, useNavigate} from '@tanstack/react-router';

import {listCodeEntriesQueryOptions} from '../messages/listCodeEntries';

const PREFIX = 'gml_Object_';

type Props = Readonly<{
	name: string;
}>;

export default function CodePrefixSelect({name: codeName}: Props) {
	const id = useId();

	const {isPending, data: allCode} = useQuery(listCodeEntriesQueryOptions());

	const navigate = useNavigate({from: '/general-info'});

	if (!codeName.startsWith(PREFIX)) {
		return null;
	}

	const objectName = codeName.split('_').slice(2, -2).join('_');
	const searchPrefix = PREFIX + objectName + '_';

	let events: string[] = [];
	if (allCode != null) {
		events = allCode.list
			.filter((code) => {
				if (code.Name.startsWith(searchPrefix)) {
					// Prevent `obj_shop_bg` from showing up with `obj_shop`
					return code.Name.slice(searchPrefix.length).split('_').length === 2;
				}

				return false;
			})
			.map((code) => {
				return code.Name.slice(searchPrefix.length);
			})
			.sort();
	}

	return (
		<Group gap="xs">
			<label htmlFor={id}>Event type:</label>

			<Select
				id={id}
				data={events}
				value={codeName.slice(searchPrefix.length)}
				searchable
				onChange={(value) => {
					if (value != null) {
						void navigate({
							to: '/code/$name',
							params: {name: searchPrefix + value},
							resetScroll: false,
						});
					}
				}}
				disabled={events.length === 0}
				loading={isPending}
				allowDeselect={false}
				floatingHeight="viewport"
				flex="1"
			/>

			<Button
				component={Link}
				to="/objects/$name"
				// @ts-expect-error Link param not detected properly
				params={{name: objectName}}
				variant="default"
			>
				View object
			</Button>
		</Group>
	);
}
