import {Title} from '@mantine/core';
import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Link, useParams} from '@tanstack/react-router';

import ContentViewAlert from '../../common/ContentViewAlert';
import ContentViewLoading from '../../common/ContentViewLoading';
import ContentViewWithPadding from '../../common/ContentViewWithPadding';
import DocumentTitle from '../../common/DocumentTitle';
import {gameObjectInfoByNameQueryOptions} from '../../messages/getGameObjectInfoByName';
import {ManagedErrorFromDotNet} from '../../worker/ManagedErrorFromDotNet';

function RouteComponent() {
	const name = useParams({
		from: '/_app/objects/$name',
		select: (params) => params.name,
	});

	const {data} = useSuspenseQuery(gameObjectInfoByNameQueryOptions(name));

	return (
		<ContentViewWithPadding>
			<DocumentTitle text={[name, 'Objects']} />

			<Title order={2} className="break-word">
				{name}
			</Title>

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
		</ContentViewWithPadding>
	);
}

export const Route = createFileRoute('/_app/objects/$name')({
	component: RouteComponent,
	loader: async ({context, params}) =>
		context.queryClient.ensureQueryData(
			gameObjectInfoByNameQueryOptions(params.name),
		),
	errorComponent({error}) {
		if (error instanceof ManagedErrorFromDotNet) {
			if (error.message === 'NoMatch') {
				return <ContentViewAlert title="This object does not exist." />;
			}
		}

		return <ContentViewAlert error={error} />;
	},
	pendingComponent: () => <ContentViewLoading text="Loading object..." />,
});
