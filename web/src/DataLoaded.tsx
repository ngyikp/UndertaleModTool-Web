import {Stack, Tabs, Title} from '@mantine/core';

import type {GameInfoType} from './GameInfoType';
import CodePage from './pages/CodePage';
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
					if (newPage === 'GENERAL_INFO' || newPage === 'CODE') {
						setPage(newPage);
					}
				}}
			>
				<Tabs.List>
					<Tabs.Tab value="GENERAL_INFO">General info</Tabs.Tab>

					{info.ItemCounts.Code > 0 ? (
						<Tabs.Tab value="CODE">Code</Tabs.Tab>
					) : null}
				</Tabs.List>

				<Tabs.Panel value="GENERAL_INFO" mt="md">
					<GeneralInfoPage info={info} setInfo={setInfo} />
				</Tabs.Panel>

				{info.ItemCounts.Code > 0 ? (
					<Tabs.Panel value="CODE" mt="md">
						<CodePage />
					</Tabs.Panel>
				) : null}
			</Tabs>
		</Stack>
	);
}
