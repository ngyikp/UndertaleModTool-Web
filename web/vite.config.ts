/// <reference types="vitest/config" />

import babel from '@rolldown/plugin-babel';
import {tanstackRouter} from '@tanstack/router-plugin/vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// https://vite.dev/config/
export default defineConfig({
	define: {
		WORKERS_CI_COMMIT_SHA: JSON.stringify(process.env.WORKERS_CI_COMMIT_SHA),
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
		headers: getServerHeaders(),
	},
	test: {
		environment: 'happy-dom',
		setupFiles: ['tests/util/setup-tests.ts'],
	},
});

function getServerHeaders() {
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
			"script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",

			// unsafe-inline:
			//   - For Monaco Editor https://github.com/Microsoft/monaco-editor/issues/271
			//   - Vite dev
			"style-src 'self' 'unsafe-inline'",

			"img-src 'self' blob:",
			'media-src blob:',

			"frame-ancestors 'none'",
			"base-uri 'none'",
			"object-src 'none'",
		].join(';'),
	};
}
