import {Title} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Link, useParams} from '@tanstack/react-router';

import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewLoading from '../../common/ContentViewLoading';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import DocumentTitle from '../../common/DocumentTitle';
import TitleWithId from '../../common/TitleWithId';
import YycWarningAlert from '../../common/YycWarningAlert';
import GameObjectEventList from '../../components/GameObjectEventList';
import {useDataStore} from '../../data-store';
import {
	type GameObjectEventAllType,
	gameObjectInfoByNameQueryOptions,
} from '../../messages/getGameObjectInfoByName';
import {
	EventSubtypeDrawValues,
	EventSubtypeGestureValues,
	EventSubtypeKeyValues,
	EventSubtypeMouseValues,
	EventSubtypeOtherValues,
	EventSubtypeStepValues,
	EventType,
} from '../../types/GameObjectEventType';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function hasAnyEvents(allEvents: GameObjectEventAllType) {
	for (const value of Object.values(allEvents)) {
		for (let i = 0; i < value.length; i += 1) {
			if (value[i]?.ActionsCodeNames != null) {
				return true;
			}
		}
	}

	return false;
}

function renderSubtypeEnum(obj: {[key: string]: string}) {
	return (subtype: number) => {
		const name = obj[subtype];
		if (name) {
			return name + ': ';
		}
		return null;
	};
}

function RouteComponent() {
	const gameInfo = useDataStore((state) => state.gameInfo);

	const name = useParams({
		from: '/_app/objects/$name',
		select: (params) => params.name,
	});

	const {data} = useSuspenseQuery(gameObjectInfoByNameQueryOptions(name));

	return (
		<ContentViewWithPadding>
			<DocumentTitle text={[name, 'Objects']} />

			<TitleWithId id={data.Id} name={name} />

			{data.SpriteName ? (
				<p>
					Sprite:{' '}
					<Link
						to="/sprites/$name"
						params={{name: data.SpriteName}}
						preload="intent"
					>
						{data.SpriteName}
					</Link>
				</p>
			) : null}

			<p>Visible: {data.Visible ? 'Yes' : 'No'}</p>

			<p>Persistent: {data.Persistent ? 'Yes' : 'No'}</p>

			{data.ParentGameObjectName != null ? (
				<p>
					Parent:{' '}
					<Link
						to="/objects/$name"
						params={{name: data.ParentGameObjectName}}
						preload="intent"
					>
						{data.ParentGameObjectName}
					</Link>
				</p>
			) : null}

			<Title order={3}>Events</Title>

			{hasAnyEvents(data.Events) ? (
				<>
					{gameInfo?.IsYYC ? <YycWarningAlert /> : null}

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Create}
						header={<Title order={4}>Create</Title>}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Destroy}
						header={<Title order={4}>Destroy</Title>}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Alarm}
						header={<Title order={4}>Alarm</Title>}
						renderSubtype={(subtype) => {
							return `Alarm ${subtype.toString()}: `;
						}}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Step}
						header={<Title order={4}>Step</Title>}
						renderSubtype={renderSubtypeEnum(EventSubtypeStepValues)}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Collision}
						header={<Title order={4}>Collision</Title>}
						renderSubtype={(subtype) => {
							// todo show object name
							return `Object ID ${subtype.toString()}: `;
						}}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Keyboard}
						header={<Title order={4}>Keyboard</Title>}
						renderSubtype={renderSubtypeEnum(EventSubtypeKeyValues)}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Mouse}
						header={<Title order={4}>Mouse</Title>}
						renderSubtype={renderSubtypeEnum(EventSubtypeMouseValues)}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Other}
						header={<Title order={4}>Other</Title>}
						renderSubtype={renderSubtypeEnum(EventSubtypeOtherValues)}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Draw}
						header={<Title order={4}>Draw</Title>}
						renderSubtype={renderSubtypeEnum(EventSubtypeDrawValues)}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.KeyPress}
						header={<Title order={4}>KeyPress</Title>}
						renderSubtype={renderSubtypeEnum(EventSubtypeKeyValues)}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.KeyRelease}
						header={<Title order={4}>KeyRelease</Title>}
						renderSubtype={renderSubtypeEnum(EventSubtypeKeyValues)}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Trigger}
						header={<Title order={4}>Trigger</Title>}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.CleanUp}
						header={<Title order={4}>CleanUp</Title>}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.Gesture}
						header={<Title order={4}>Gesture</Title>}
						renderSubtype={renderSubtypeEnum(EventSubtypeGestureValues)}
					/>

					<GameObjectEventList
						allEvents={data.Events}
						type={EventType.PreCreate}
						header={<Title order={4}>PreCreate</Title>}
					/>
				</>
			) : (
				<p>This object has no events.</p>
			)}
		</ContentViewWithPadding>
	);
}

export const Route = createFileRoute('/_app/objects/$name')({
	component: RouteComponent,
	loader: async ({context, params}) =>
		context.queryClient.query(gameObjectInfoByNameQueryOptions(params.name)),
	errorComponent({error}) {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message.startsWith('ArgumentOutOfRange_IndexMustBeLess')) {
				return <ContentViewAlert title="This object does not exist." />;
			}
		}

		return <ContentViewAlert error={error} />;
	},
	pendingComponent: () => <ContentViewLoading text="Loading object..." />,
});
