// @vitest-environment node

import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

import {parse as jsoncParse} from 'jsonc-parser';
import {describe, expect, test} from 'vitest';
import {z} from 'zod/mini';

import {DataFileLoadInfoSchema} from '../src/messages/readFile';
import {GameInfoSchema} from '../src/types/GameInfoType';
import loadAssembly from '../src/worker/loadAssembly';

// Skip this test if the file doesn't exist, but throw error if
// parsing the JSON fails
let dataFileTestsRaw: string = '';
try {
	dataFileTestsRaw = await readFile(
		resolve(__dirname, '../../data-file-tests.jsonc'),
		'utf-8',
	);
} catch {
	console.log("Skipping test as `data-file-tests.jsonc` doesn't exist");
}

describe.runIf(dataFileTestsRaw !== '')('loads data files', () => {
	if (dataFileTestsRaw === '') {
		// maybe https://github.com/vitest-dev/vitest/issues/10407
		return;
	}

	let testCount = 0;
	const dataTests = parseDataFileTests(dataFileTestsRaw);
	// todo should this be `describe` instead of `test`?
	test.runIf(dataTests.length).for(dataTests)(
		'$name',
		async (data, {onTestFailed, skip}) => {
			const messageId = testCount++;

			onTestFailed(() => {
				console.error('Test failed, console messages from .NET:');
				console.error(dotNetMessages.get(messageId));
			});

			let file;
			try {
				file = await readFile(data.path);
			} catch {
				skip(data.path + ' does not exist');
				return;
			}

			const fileMd5 = createHash('md5').update(file).digest('hex');
			skip(
				fileMd5 !== data.md5,
				`${data.path} MD5 checksum does not match (expected: ${data.md5}, actual: ${fileMd5})`,
			);

			const dotNet = await loadAssembly(
				'../../public/dotnet/wwwroot/_framework/dotnet.js',
				false, // turn off as the console logs get very spammy
			);
			dotNet.Module.FS.writeFile('data.win', file);

			// Load info
			const loadInfo = DataFileLoadInfoSchema.parse(
				JSON.parse(
					dotNet.exports.UndertaleModToolWASM.Program.ReadFile(
						messageId,
						'data.win',
					),
				),
			);
			expect(loadInfo.Warnings).toHaveLength(0);

			// General info
			const generalInfo = GameInfoSchema.parse(
				JSON.parse(dotNet.exports.UndertaleModToolWASM.Program.GetGameInfo()),
			);
			await expect(generalInfo).toMatchFileSnapshot(
				'./__snapshots__/load-data-file/' + data.name + '.snap',
			);
		},
	);
});

function parseDataFileTests(list: string) {
	const DataFileTestsSchema = z.array(
		z.object({
			name: z.string(),
			path: z.string(),
			md5: z.hash('md5'),
		}),
	);

	return DataFileTestsSchema.parse(jsoncParse(list));
}

const dotNetMessages = new Map<number, string[]>();

globalThis.receiveMessageFromDotNet = (messageId: number, text: string) => {
	if (!dotNetMessages.has(messageId)) {
		dotNetMessages.set(messageId, []);
	}
	(dotNetMessages.get(messageId) ?? []).push(text);
};
