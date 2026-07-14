import babel from '@rolldown/plugin-babel';
import {tanstackRouter} from '@tanstack/router-plugin/vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true,
		}),
		react(),
		babel({presets: [reactCompilerPreset()]}),
	],
});
