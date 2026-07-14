import {MantineProvider} from '@mantine/core';
import {useState} from 'react';

import type {GameInfoType} from './GameInfoType';
import '@mantine/core/styles.css';
import OverviewPage from './pages/OverviewPage';
import WelcomePage from './pages/WelcomePage';
import type {PageType} from './PageType';

export default function App() {
	const [info, setInfo] = useState<GameInfoType | null>(null);
	const [page, setPage] = useState<PageType>('WELCOME');

	return (
		<MantineProvider>
			<main id="main">
				{!info ? (
					<WelcomePage setInfo={setInfo} setPage={setPage} />
				) : page === 'OVERVIEW' ? (
					<OverviewPage info={info} />
				) : null}
			</main>
		</MantineProvider>
	);
}
