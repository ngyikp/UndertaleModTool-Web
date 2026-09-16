import {type ErrorComponentProps} from '@tanstack/react-router';
import {useEffect} from 'react';

import BasicErrorAlert from './common/BasicErrorAlert';
import GameDataNotLoadedError from './common/GameDataNotLoadedError';
import {ManagedErrorFromDotNet} from './worker/ManagedErrorFromDotNet';

export default function TopErrorComponent({error}: ErrorComponentProps) {
	useEffect(() => {
		if (error instanceof GameDataNotLoadedError) {
			// todo fix cache data jank so no need to reload the entire page

			// unloadGame();
			// void router.invalidate();
			window.location.reload();
		}
	}, [error]);

	if (error instanceof ManagedErrorFromDotNet) {
		if (error.message.endsWith('NativeMagickSettings')) {
			return (
				<BasicErrorAlert error="This functionality requires ImageMagick which is not implemented on the web version yet." />
			);
		}
	}

	if (error instanceof GameDataNotLoadedError) {
		return null;
	}

	return <BasicErrorAlert error={error} />;
}
