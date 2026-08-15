import * as monaco from 'monaco-editor/editor/editor.api';
import type {languages} from 'monaco-editor/editor/editor.api';
import editorWorker from 'monaco-editor/editor/editor.worker?worker';
import 'monaco-editor/features/register.all';
// @ts-expect-error can't type-check for whatever reason
import {language as typescriptLanguage} from 'monaco-editor/languages/definitions/typescript/typescript.js';

// @ts-expect-error can't type-check for whatever reason
declare module 'monaco-editor/languages/definitions/typescript/typescript.js' {
	export const conf: languages.LanguageConfiguration;
	export const language: languages.IMonarchLanguage;
}

self.MonacoEnvironment = {
	getWorker() {
		return new editorWorker();
	},
};

monaco.languages.register({id: 'gml'});

monaco.languages.setMonarchTokensProvider('gml', {
	...(typescriptLanguage as languages.IMonarchLanguage),

	// From https://github.com/UnderminersTeam/UndertaleModTool/blob/2b6fe69722cec25219f1ae21f8111907c2a15629/UndertaleModTool/Resources/GML.xshd#L47
	keywords: [
		'if',
		'else',
		'do',
		'while',
		'for',
		'repeat',
		'switch',
		'case',
		'default',
		'break',
		'continue',
		'with',
		'new',
		'constructor',
		'function',
		'return',
		'exit',
		'var',
		'until',
		'and',
		'or',
		'xor',
		'begin',
		'end',
		'then',
		'mod',
		'div',
		'throw',
		'static',
		'try',
		'catch',
		'finally',
		'enum',

		'true',
		'false',
		'self',
		'other',
		'all',
		'noone',
		'global',
		'undefined',
	],
});

// GML language configuration is from the Stitch for VSCode extension
//
// Licensed under the MIT License
// https://github.com/bscotch/stitch/blob/develop/packages/vscode/LICENSE.md
//
// Copyright 2023 Butterscotch Shenanigans
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

monaco.languages.setLanguageConfiguration('gml', {
	comments: {lineComment: '//', blockComment: ['/*', '*/']},
	brackets: [
		['{', '}'],
		['[|', ']'],
		['[$', ']'],
		['[?', ']'],
		['[@', ']'],
		['[', ']'],
		['(', ')'],
	],
	autoClosingPairs: [
		{open: '{', close: '}'},
		{open: '[', close: ']'},
		{open: '(', close: ')'},
		{open: '@"', close: '"', notIn: ['string', 'comment']},
		{open: "@'", close: "'", notIn: ['string', 'comment']},
		{open: "'", close: "'", notIn: ['string', 'comment']},
		{open: '"', close: '"', notIn: ['string', 'comment']},
		{open: '/*', close: ' */', notIn: ['string']},
	],
	surroundingPairs: [
		{open: '{', close: '}'},
		{open: '[', close: ']'},
		{open: '(', close: ')'},
		{open: "'", close: "'"},
		{open: '"', close: '"'},
		{open: '`', close: '`'},
		{open: '<', close: '>'},
	],
	autoCloseBefore: ';:.,=}])>` \n\t',
	folding: {
		markers: {
			start: new RegExp('^\\s*#region\\b'),
			end: new RegExp('^\\s*#endregion\\b'),
		},
	},
	wordPattern: new RegExp(
		'(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\\'\\"\\,\\.\\<\\>/\\?\\s]+)',
	),
	indentationRules: {
		decreaseIndentPattern: new RegExp('^((?!.*?/\\*).*\\*/)?\\s*[\\}\\]].*$'),
		increaseIndentPattern: new RegExp(
			'^((?!//).)*(\\{([^}"\'`/]*|(\\t|[ ])*//.*)|\\([^)"\'`/]*|\\[[^\\]"\'`/]*)$',
		),
		unIndentedLinePattern: new RegExp(
			'^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$|^(\\t|[ ])*[ ]\\*/\\s*$|^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$',
		),
	},
	onEnterRules: [
		{
			beforeText: new RegExp('^\\s*/\\*\\*(?!/)([^\\*]|\\*(?!/))*$'),
			afterText: new RegExp('^\\s*\\*/$'),
			action: {
				indentAction: monaco.languages.IndentAction.IndentOutdent,
				appendText: ' * ',
			},
		},
		{
			beforeText: new RegExp('^\\s*/\\*\\*(?!/)([^\\*]|\\*(?!/))*$'),
			action: {
				indentAction: monaco.languages.IndentAction.None,
				appendText: ' * ',
			},
		},
		{
			beforeText: new RegExp('^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$'),
			previousLineText: new RegExp(
				'(?=^(\\s*(/\\*\\*|\\*)).*)(?=(?!(\\s*\\*/)))',
			),
			action: {
				indentAction: monaco.languages.IndentAction.None,
				appendText: '* ',
			},
		},
		{
			beforeText: new RegExp('^(\\t|[ ])*[ ]\\*/\\s*$'),
			action: {indentAction: monaco.languages.IndentAction.None, removeText: 1},
		},
		{
			beforeText: new RegExp('^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$'),
			action: {indentAction: monaco.languages.IndentAction.None, removeText: 1},
		},
		{
			beforeText: new RegExp('^\\s*(\\bcase\\s.+:|\\bdefault:)$'),
			afterText: new RegExp('^(?!\\s*(\\bcase\\b|\\bdefault\\b))'),
			action: {indentAction: monaco.languages.IndentAction.Indent},
		},
	],
});
