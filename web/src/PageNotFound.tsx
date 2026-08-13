import {Button} from '@mantine/core';
import {Link} from '@tanstack/react-router';

import BasicErrorAlert from './common/BasicErrorAlert';
import DocumentTitle from './common/DocumentTitle';
import GenericHeaderAndFooter from './common/GenericHeaderAndFooter';

export default function PageNotFound() {
	return (
		<>
			<DocumentTitle text="Page not found" />

			<GenericHeaderAndFooter>
				<BasicErrorAlert title="Page not found." />

				<div>
					<Button component={Link} to="/">
						Go to homepage
					</Button>
				</div>
			</GenericHeaderAndFooter>
		</>
	);
}
