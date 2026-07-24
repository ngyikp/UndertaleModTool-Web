import {Stack, Title} from '@mantine/core';
import {createFileRoute, useNavigate} from '@tanstack/react-router';

import DataFileInput from '../common/DataFileInput';
import Footer from '../common/Footer';

function Index() {
	const navigate = useNavigate({from: '/'});

	return (
		<Stack>
			<Title>UndertaleModTool on the Web</Title>

			<DataFileInput
				onFileLoaded={() => {
					void navigate({to: '/general-info'});
				}}
			/>

			<Footer />
		</Stack>
	);
}

export const Route = createFileRoute('/')({
	component: Index,
});
