import js from '@eslint/js';
import {defineConfig} from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default defineConfig(
	js.configs.recommended,
	tseslint.configs.strictTypeChecked,
	reactHooks.configs.flat.recommended,
	reactRefresh.configs.vite,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	},
	{
		files: ['**/*.{js,ts,tsx}'],
	},
	{
		ignores: ['dist', 'public/dotnet/'],
	},
);
