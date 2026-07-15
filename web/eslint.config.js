import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import {defineConfig} from 'eslint/config';
import {importX} from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import {reactRefresh} from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default defineConfig(
	js.configs.recommended,
	tseslint.configs.strictTypeChecked,

	importX.flatConfigs.typescript,
	eslintReact.configs['strict-type-checked'],
	reactHooks.configs.flat.recommended,
	tanstackQuery.configs['flat/recommended-strict'],

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
	{
		rules: {
			'no-var': 'error',
			'prefer-const': 'warn',

			'@eslint-react/immutability': 'error',

			'@typescript-eslint/no-empty-object-type': [
				'error',
				{
					allowObjectTypes: 'always',
				},
			],

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
		},
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
