import {Alert} from '@mantine/core';

import ExternalLinkInNewWindow from './ExternalLinkInNewWindow';

export default function YycWarningAlert() {
	return (
		<Alert
			variant="light"
			color="yellow"
			title={
				<>
					This game uses{' '}
					<ExternalLinkInNewWindow href="https://manual.gamemaker.io/monthly/en/Settings/YoYo_Compiler.htm">
						YYC (YoYo Compiler)
					</ExternalLinkInNewWindow>{' '}
					which means viewing the source code is not possible.
				</>
			}
		/>
	);
}
