import {Alert, Button, Stack, Title} from '@mantine/core';
import {Link} from '@tanstack/react-router';

import DocumentTitle from './DocumentTitle';

export default function PageNotFound() {
	return (
		<Stack>
			<DocumentTitle text="Page not found" />

			<Title>UndertaleModTool on the Web</Title>

			<Alert variant="light" color="red" title="Page not found." />

			<div>
				<Button component={Link} to="/">
					Go to homepage
				</Button>
			</div>
		</Stack>
	);
}
