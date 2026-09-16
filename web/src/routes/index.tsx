import {createFileRoute, useNavigate} from '@tanstack/react-router';

import DataFileInput from '../common/DataFileInput';
import DocumentTitle from '../common/DocumentTitle';
import GenericHeaderAndFooter from '../common/GenericHeaderAndFooter';

function Index() {
	const navigate = useNavigate({from: '/'});

	return (
		<GenericHeaderAndFooter>
			<DocumentTitle text="" />

			<DataFileInput
				onFileLoaded={() => {
					void navigate({to: '/general-info'});
				}}
			/>
		</GenericHeaderAndFooter>
	);
}

export const Route = createFileRoute('/')({
	component: Index,
});
