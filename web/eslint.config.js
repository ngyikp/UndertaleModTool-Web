import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import tanstackRouter from '@tanstack/eslint-plugin-router';
import vitest from '@vitest/eslint-plugin';
import {defineConfig} from 'eslint/config';
import {importX} from 'eslint-plugin-import-x';
import jsxA11yX from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import {reactRefresh} from 'eslint-plugin-react-refresh';
import testingLibrary from 'eslint-plugin-testing-library';
import tseslint from 'typescript-eslint';

export default defineConfig(
	js.configs.recommended,
	tseslint.configs.strictTypeChecked,

	importX.flatConfigs.typescript,
	eslintReact.configs['strict-type-checked'],
	reactHooks.configs.flat.recommended,
	// https://github.com/ArnaudBarre/eslint-plugin-react-refresh/issues/102#issuecomment-3881982814
	reactRefresh.configs.vite({
		extraHOCs: [
			'createFileRoute',
			'createLazyFileRoute',
			'createRootRoute',
			'createRootRouteWithContext',
			'createLink',
			'createRoute',
			'createLazyRoute',
		],
	}),
	jsxA11yX.configs.strict,
	tanstackQuery.configs['flat/recommended-strict'],
	tanstackRouter.configs['flat/recommended'],
	{
		rules: {
			'no-var': 'error',
			'prefer-const': 'warn',

			'@eslint-react/immutability': 'error',

			// `importX.flatConfigs.recommended` without slow rules
			// https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
			'import-x/export': 'error',
			'import-x/no-named-as-default': 'warn',
			'import-x/no-duplicates': 'warn',

			// 'import/enforce-node-protocol-usage': ['error', 'always'],
			'import-x/order': [
				'warn',
				{
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
					named: true,
				},
			],

			// Audio comes from game data files and doesn't contain captions
			'jsx-a11y-x/media-has-caption': 'off',
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ['**/*.{js,ts,tsx}'],
	},
	{
		files: ['tests/**'],
		extends: [testingLibrary.configs['flat/react'], vitest.configs.recommended],
	},
	{
		ignores: ['dist', 'public/dotnet/'],
	},
);
