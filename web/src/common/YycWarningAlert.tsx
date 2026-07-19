import {Alert} from '@mantine/core';

export default function YycWarningAlert() {
	return (
		<Alert
			variant="light"
			color="yellow"
			title={
				<>
					This game uses{' '}
					<a
						href="https://manual.gamemaker.io/monthly/en/Settings/YoYo_Compiler.htm"
						target="_blank"
						rel="noreferrer"
					>
						YYC (YoYo Compiler)
					</a>{' '}
					which means viewing the source code is not possible.
				</>
			}
		/>
	);
}
