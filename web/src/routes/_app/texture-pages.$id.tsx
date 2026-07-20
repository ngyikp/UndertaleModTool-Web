import {Stack, Title} from '@mantine/core';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, useParams} from '@tanstack/react-router';

import BasicErrorAlert from '../../common/BasicErrorAlert';
import DocumentTitle from '../../common/DocumentTitle';
import {getTexturePageInfoById} from '../../messages/getTexturePageInfoById';

const texturePageByIdQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ['texture-pages', id],
		queryFn() {
			return getTexturePageInfoById(id);
		},
	});

function RouteComponent() {
	const {id} = useParams({
		from: '/_app/texture-pages/$id',
	});

	const {data} = useSuspenseQuery(
		texturePageByIdQueryOptions(parseInt(id, 10)),
	);
	// const {FileContents: fileContents} = data;

	// const [blobUrl, setBlobUrl] = useState<string | null>(null);

	// useEffect(() => {
	// 	if (fileContents.length <= 0) {
	// 		return;
	// 	}

	// 	const blob = new Blob([fileContents], {
	// 		type: mimeType ?? 'application/octet-stream',
	// 	});
	// 	const url = window.URL.createObjectURL(blob);
	// 	// eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect
	// 	setBlobUrl(url);

	// 	return () => {
	// 		setBlobUrl(null);
	// 		window.URL.revokeObjectURL(url);
	// 	};
	// }, [fileContents, mimeType]);

	return (
		<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
			<DocumentTitle text={['Texture ' + id, 'Texture pages']} />

			<Title order={2}>Texture {id}</Title>

			<p>
				Source position: {data.SourceX}x{data.SourceY}
				<br />
				Source size: {data.SourceWidth}x{data.SourceHeight}
			</p>

			<p>
				Target position: {data.TargetX}x{data.TargetY}
				<br />
				Target size: {data.TargetWidth}x{data.TargetHeight}
			</p>

			<p>
				Bounding size: {data.BoundingWidth}x{data.BoundingHeight}
			</p>

			{/* {blobUrl ? (
				<div>
					<Button component="a" href={blobUrl} download={'Texture ' + id}>
						Export raw image
					</Button>
				</div>
			) : null}

			{blobUrl && mimeType === 'image/png' ? (
				<div style={{overflowX: 'auto'}}>
					<img
						src={blobUrl}
						alt={'Texture ' + id}
						className="checkerboard"
						style={{display: 'block'}}
					/>
				</div>
			) : null} */}
		</Stack>
	);
}

export const Route = createFileRoute('/_app/texture-pages/$id')({
	component: RouteComponent,
	loader: ({context, params}) =>
		context.queryClient.ensureQueryData(
			texturePageByIdQueryOptions(parseInt(params.id, 10)),
		),
	errorComponent: ({error}) => {
		if (error.message === 'NoMatch') {
			return (
				<Stack flex="1" mt="md" mb="lg" style={{minWidth: 0}}>
					<BasicErrorAlert title="This texture page does not exist." />
				</Stack>
			);
		}

		throw error;
	},
});
