import {useState} from 'react';
import {loadFile} from './worker/worker-handler';
import type {WorkerStatuses} from './worker/WorkerMessageTypes';

export default function App() {
	const [status, setStatus] = useState<WorkerStatuses | null>(null);
	const [info, setInfo] = useState<string>('');
	const [errorDetails, setErrorDetails] = useState<Error | null>(null);

	function onFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
		const fileInput = ev.currentTarget;
		if (!(fileInput instanceof HTMLInputElement)) {
			throw new Error('Expected HTMLInputElement');
		}

		if (fileInput.files && fileInput.files[0]) {
			void processFile(fileInput.files[0]);
		}
	}

	async function processFile(file: File) {
		console.log('Starting...');

		setStatus('LOADING');
		setInfo('');
		setErrorDetails(null);

		const bytes = await file.bytes();
		loadFile(bytes, (response) => {
			setStatus(response.status);

			switch (response.status) {
				case 'LOADING':
				case 'PROCESSING':
					break;

				case 'FINISHED': {
					setInfo(response.info);
					break;
				}

				case 'ERROR':
					console.error(response.errorDetails);
					setErrorDetails(new Error(response.errorDetails));
					break;

				default:
					break;
			}
		});
	}

	return (
		<>
			<h1>UndertaleModTool on the Web</h1>

			<input type="file" onChange={onFileChange} />

			{status === 'LOADING' ? (
				<p>
					<strong>Loading UndertaleModTool...</strong>
				</p>
			) : status === 'PROCESSING' ? (
				<p>
					<strong>Loading game data...</strong>
				</p>
			) : status === 'ERROR' ? (
				<p>
					⚠️ Oops, there was a problem while processing this file
					{errorDetails ? (
						<>
							: <code>{errorDetails.message}</code>
						</>
					) : null}
				</p>
			) : null}

			<pre>{info}</pre>
		</>
	);
}
