import {RouterProvider} from '@tanstack/react-router';

type Props = Readonly<{
	router: React.ComponentProps<typeof RouterProvider>['router'];
}>;

export default function RouterProviderWithContext({router}: Props) {
	return <RouterProvider router={router} />;
}
