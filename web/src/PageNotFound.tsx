import {Button, Stack, Title} from '@mantine/core';
import {Link} from '@tanstack/react-router';

import BasicErrorAlert from './common/BasicErrorAlert';
import DocumentTitle from './common/DocumentTitle';
import Footer from './common/Footer';

export default function PageNotFound() {
	return (
		<Stack>
			<DocumentTitle text="Page not found" />

			<Title>UndertaleModTool on the Web</Title>

			<BasicErrorAlert error="Page not found." />

			<div>
				<Button component={Link} to="/">
					Go to homepage
				</Button>
			</div>

			<Footer />
		</Stack>
	);
}
