import {List} from '@mantine/core';
import {Link} from '@tanstack/react-router';
import {Fragment} from 'react';

import type {GameObjectEventAllType} from '../messages/getGameObjectInfoByName';
import type {EventType} from '../types/GameObjectEventType';

const EMPTY_RENDER_SUBTYPE = () => {
	return null;
};

type Props = Readonly<{
	allEvents: GameObjectEventAllType;
	type: (typeof EventType)[keyof typeof EventType];
	header: React.ReactNode;
	renderSubtype?: (subtype: number) => React.ReactNode;
}>;

export default function GameObjectEventList({
	allEvents,
	type,
	header,
	renderSubtype = EMPTY_RENDER_SUBTYPE,
}: Props) {
	const events = allEvents[type];
	if (!events || events.length === 0) {
		return null;
	}

	return (
		<>
			{header}
			<List>
				{events.map((event, index) => {
					const codeNames = event.ActionsCodeNames.filter(Boolean) as string[];
					if (codeNames.length === 0) {
						return null;
					}

					return (
						// EventSubtype is not unique
						// eslint-disable-next-line @eslint-react/no-array-index-key
						<List.Item key={index}>
							{renderSubtype(event.EventSubtype)}
							{codeNames.map((code, index) => {
								return (
									<Fragment key={code}>
										<Link
											to="/code/$name"
											params={{name: code}}
											preload="intent"
										>
											{code}
										</Link>
										{index + 1 !== codeNames.length ? ', ' : null}
									</Fragment>
								);
							})}
						</List.Item>
					);
				})}
			</List>
		</>
	);
}
