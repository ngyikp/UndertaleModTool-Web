import {Cascader, type CascaderOption, Group} from '@mantine/core';
import {useId} from '@mantine/hooks';
import {useQuery} from '@tanstack/react-query';
import {Link, useNavigate} from '@tanstack/react-router';
import {useMemo} from 'react';

import {listCodeEntriesQueryOptions} from '../messages/listCodeEntries';
import {
	EventType,
	getLabelForEventSubtype,
	isEventHasNoSubtypes,
	isValidEvent,
} from '../types/GameObjectEventType';

function getCurrentCascaderValue(event: string[]) {
	const [type, subtype] = event;
	if (type != null && subtype != null) {
		if (isValidEvent(type) && isEventHasNoSubtypes(EventType[type])) {
			return [type + '_' + subtype];
		}

		return [type, type + '_' + subtype];
	}

	return null;
}

const PREFIX = 'gml_Object_';

type Props = Readonly<{
	name: string;
}>;

export default function CodePrefixSelect({name: codeName}: Props) {
	const id = useId();

	const {isPending, data: allCode} = useQuery(listCodeEntriesQueryOptions());

	const navigate = useNavigate({from: '/code/$name'});

	const nameSplit = codeName.split('_');
	const currentObjectName = nameSplit.slice(2, -2).join('_');
	const searchPrefix = PREFIX + currentObjectName + '_';

	const cascaderData: CascaderOption[] = useMemo(() => {
		if (allCode == null) {
			return [];
		}

		const eventsGrouped = new Map<string, number[]>();
		allCode.list
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
			.sort()
			.forEach((code) => {
				const [event, subtype] = code.split('_');
				if (event == null || subtype == null) {
					return;
				}

				if (!eventsGrouped.has(event)) {
					eventsGrouped.set(event, []);
				}
				(eventsGrouped.get(event) ?? []).push(parseInt(subtype, 10));
			});

		const cascaderData = [];
		for (const [key, value] of eventsGrouped) {
			if (!isValidEvent(key)) {
				continue;
			}

			const eventType = EventType[key];
			cascaderData.push({
				label: key,
				value:
					isEventHasNoSubtypes(eventType) && value[0] != null
						? key + '_' + value[0].toString()
						: key,
				children: isEventHasNoSubtypes(eventType)
					? undefined
					: value
							.sort((a, b) => {
								if (a < b) {
									return -1;
								} else if (a > b) {
									return 1;
								}

								return 0;
							})
							.map((subtype) => {
								return {
									label: `${getLabelForEventSubtype(eventType, subtype)} (${key}_${subtype.toString()})`,
									value: key + '_' + subtype.toString(),
								};
							}),
			});
		}

		return cascaderData;
	}, [allCode, searchPrefix]);

	if (!codeName.startsWith(PREFIX)) {
		return null;
	}

	return (
		<Group>
			<Group gap="xs" flex="1">
				<label htmlFor={id}>Event type:</label>

				<Cascader
					id={id}
					data={cascaderData}
					value={getCurrentCascaderValue(nameSplit.slice(-2))}
					searchable
					onChange={(value) => {
						const last = value != null ? value[value.length - 1] : undefined;
						if (last != null) {
							void navigate({
								to: '/code/$name',
								params: {name: searchPrefix + last},
								resetScroll: false,
							});
						}
					}}
					styles={{
						column: {
							// setting `columnWidth` prop on Cascader would set min-width
							// https://github.com/mantinedev/mantine/blob/9.5.1/packages/%40mantine/core/src/components/Cascader/CascaderColumns.tsx#L138
							width: 'max-content',
						},
					}}
					comboboxProps={{
						width: 'max-content',
					}}
					disabled={cascaderData.length === 0}
					loading={isPending}
					expandTrigger="hover"
					allowDeselect={false}
					flex="1"
				/>
			</Group>

			<Link
				to="/objects/$name"
				params={{name: currentObjectName}}
				preload="intent"
			>
				View object
			</Link>
		</Group>
	);
}
