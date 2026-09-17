import {useQuery} from '@tanstack/react-query';
import {createFileRoute, Navigate, useNavigate} from '@tanstack/react-router';

import DataFileInput from '../common/DataFileInput';
import DocumentTitle from '../common/DocumentTitle';
import GenericHeaderAndFooter from '../common/GenericHeaderAndFooter';
import {getDataFileLoadInfoQueryOptions} from '../messages/getDataFileLoadInfo';

function Index() {
	const navigate = useNavigate({from: '/'});

	const {data: dataFileLoadInfo} = useQuery(getDataFileLoadInfoQueryOptions());
	if (dataFileLoadInfo?.Successful) {
		return <Navigate from="/" to="/general-info" mask={{to: '/'}} />;
	}

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
