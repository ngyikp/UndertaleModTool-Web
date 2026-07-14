import {MantineProvider} from '@mantine/core';
import {useState} from 'react';

import DataLoaded from './DataLoaded';
import type {GameInfoType} from './GameInfoType';
import '@mantine/core/styles.css';
import WelcomePage from './pages/WelcomePage';
import type {PageType} from './PageType';

export default function App() {
	const [info, setInfo] = useState<GameInfoType | null>(null);
	const [page, setPage] = useState<PageType>('GENERAL_INFO');

	return (
		<MantineProvider>
			<main id="main">
				{!info ? (
					<WelcomePage setInfo={setInfo} setPage={setPage} />
				) : (
					<DataLoaded
						info={info}
						page={page}
						setInfo={setInfo}
						setPage={setPage}
					/>
				)}
			</main>
		</MantineProvider>
	);
}
