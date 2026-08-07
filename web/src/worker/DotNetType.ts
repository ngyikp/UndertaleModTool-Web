import type {EmscriptenModule} from '../../public/dotnet/wwwroot/_framework/dotnet';
import type {ModelTypeKeys} from '../types/ModelType';

export type AppExports = {
	UndertaleModToolWASM: {
		Program: {
			ReadFile(fileName: string): string;
			SaveDataFile(fileName: string): true;
			GetGameInfo(): string;

			GetEntriesByModelType(modelType: ModelTypeKeys): string;

			GetSpriteInfoByName(name: string): string;

			GetCodeInfoByName(name: string): string;
			EditCodeTextByName(name: string, sourceCode: string): true;

			GetSoundInfoByName(name: string): string;
			GetEmbeddedTextureInfoById(id: number): string;
			GetTexturePageInfoById(id: number): string;
			GetEmbeddedAudioInfoById(id: number): string;
		};
	};
};

export type DotNetType = {
	exports: AppExports;
	Module: EmscriptenModule;
};

declare module '../../public/dotnet/wwwroot/_framework/dotnet' {
	export interface EmscriptenModule {
		FS: {
			/**
			 * Reads the entire file at `path` and returns it as a new `Uint8Array` buffer (encoding is `binary`).
			 *
			 * @see https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.readFile
			 * @param path The file to read.
			 * @param opts.encoding Defines the encoding used to return the file contents: `binary` | `utf8` . The default is `binary`
			 * @param opts.flags Read flags, as defined in `FS.open()`. The default is ‘r’.
			 * @returns The file as a `Uint8Array` buffer.
			 */
			readFile(
				path: string,
				opts?: {
					encoding?: 'binary';
					flags?: string;
				},
			): Uint8Array<ArrayBuffer>;

			/**
			 * Reads the entire file at `path` and returns it as a `string` (encoding is `utf8`).
			 *
			 * @see https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.readFile
			 * @param path The file to read.
			 * @param opts.encoding Defines the encoding used to return the file contents: `binary` | `utf8` . The default is `binary`
			 * @param opts.flags Read flags, as defined in `FS.open()`. The default is ‘r’.
			 * @returns The file as a `string`.
			 */
			readFile(
				path: string,
				opts: {
					encoding: 'utf8';
					flags?: string;
				},
			): string;

			/**
			 * Writes the entire contents of `data` to the file at `path`.
			 *
			 * @see https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.writeFile
			 * @param path The file to which to write `data`.
			 * @param data The data to write. A string will always be decoded as UTF-8.
			 * @param opts.flags Write flags, as defined in `FS.open()`. The default is ‘w’.
			 */
			writeFile(
				path: string,
				data: string | ArrayBufferView,
				opts?: {
					flags?: string;
				},
			): void;
		};
	}
}
