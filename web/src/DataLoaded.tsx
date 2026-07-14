import {Stack, Tabs, Title} from '@mantine/core';

import type {GameInfoType} from './GameInfoType';
import GeneralInfoPage from './pages/GeneralInfoPage';
import type {PageType} from './PageType';

type Props = Readonly<{
	info: GameInfoType;
	page: PageType;
	setInfo: (newInfo: GameInfoType | null) => void;
	setPage: (newPage: PageType) => void;
}>;

export default function DataLoaded({info, page, setInfo, setPage}: Props) {
	return (
		<Stack>
			<Title>{info.ProjectName}</Title>

			<Tabs
				value={page}
				onChange={(newPage) => {
					if (newPage === 'GENERAL_INFO') {
						setPage(newPage);
					}
				}}
			>
				<Tabs.List>
					<Tabs.Tab value="GENERAL_INFO">General info</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="GENERAL_INFO" mt="md">
					<GeneralInfoPage info={info} setInfo={setInfo} />
				</Tabs.Panel>
			</Tabs>
		</Stack>
	);
}
