/// <reference types="vitest/config" />

import {createHash} from 'node:crypto';
import {copyFile, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

import babel from '@rolldown/plugin-babel';
import {tanstackRouter} from '@tanstack/router-plugin/vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// https://vite.dev/config/
export default defineConfig(async ({mode}) => {
	return {
		define: {
			BUILD_COMMIT_SHA: JSON.stringify(process.env.CF_PAGES_COMMIT_SHA),
			DOTNET_JS_PATH: JSON.stringify(await cacheBustDotNetJs(mode)),
		},
		plugins: [
			tanstackRouter({
				target: 'react',
				autoCodeSplitting: true,
			}),
			react(),
			babel({presets: [reactCompilerPreset()]}),
		],
		server: {
			headers: getServerHeaders(mode),
		},
		test: {
			environment: 'happy-dom',
			setupFiles: ['tests/util/setup-tests.ts'],
		},
	};
});

// Alternative to WasmFingerprintDotnetJs, as there's no easy way to figure
// out the fingerprinted name and I don't want to deal with MSBuild
// https://github.com/dotnet/runtime/blob/v10.0.11/src/mono/browser/README.md#dotnetjs
async function cacheBustDotNetJs(mode: string) {
	// todo make this work on dev too, right now it fails if the .NET
	// project is recompiled after Vite has started, maybe we could
	// monitor the `public/dotnet/` folder and re-run this cache-bust
	if (mode !== 'production') {
		return 'dotnet.js';
	}

	const jsPath = resolve(
		import.meta.dirname,
		'public/dotnet/wwwroot/_framework/dotnet.js',
	);
	const contents = await readFile(jsPath, 'utf-8');

	const hash = createHash('md5').update(contents).digest('hex').slice(0, 8);
	const cacheBustedName = 'dotnet-' + hash + '.js';
	const cacheBustPath = resolve(
		import.meta.dirname,
		'public/dotnet/wwwroot/_framework/' + cacheBustedName,
	);
	// try {
	// 	await stat(cacheBustPath);
	// } catch {
	await copyFile(jsPath, cacheBustPath);
	// }

	return cacheBustedName;
}

function getServerHeaders(mode: string) {
	// Keep this in sync with /public/_headers
	return {
		'X-Content-Type-Options': 'nosniff',
		'X-XSS-Protection': '0',
		'X-Frame-Options': 'DENY',
		// 'Strict-Transport-Security': 'max-age=31536000', // irrelevant during dev
		'Cross-Origin-Embedder-Policy': 'require-corp',
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Resource-Policy': 'same-origin',
		'Permissions-Policy':
			'accelerometer=(),bluetooth=(),camera=(),display-capture=(),geolocation=(),gyroscope=(),hid=(),magnetometer=(),microphone=(),midi=(),otp-credentials=(),payment=(),publickey-credentials-create=(),publickey-credentials-get=(),serial=(),usb=(),xr-spatial-tracking=()',

		'Content-Security-Policy': [
			"default-src 'self'",

			// unsafe-inline: For Vite dev server
			[
				'script-src',
				"'self'",
				mode !== 'production' ? "'unsafe-inline'" : '',
				"'wasm-unsafe-eval'",
			].join(' '),

			// unsafe-inline:
			//   - For Vite dev server
			//   - For Monaco Editor https://github.com/Microsoft/monaco-editor/issues/271
			"style-src 'self' 'unsafe-inline'",

			"img-src 'self' blob:",
			'media-src blob:',

			"frame-ancestors 'none'",
			"base-uri 'none'",
			"object-src 'none'",
		].join(';'),
	};
}
