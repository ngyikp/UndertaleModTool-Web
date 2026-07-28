import type {EmscriptenModule} from '../../public/dotnet/wwwroot/_framework/dotnet';
import type {ModelTypeKeys} from '../types/ModelType';

export type AppExports = {
	UndertaleModToolWASM: {
		Program: {
			ReadFile(fileName: string): string;
			GetEntriesByModelType(modelType: ModelTypeKeys): string;

			GetSpriteInfoByName(name: string): string;

			GetCodeInfoByName(name: string): string;
			EditCodeTextByName(name: string, sourceCode: string): true;

			GetSoundInfoByName(name: string): string;
			GetEmbeddedTextureInfoById(id: number): string;
			GetTexturePageInfoById(id: number): string;
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
			// https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.writeFile
			writeFile(
				path: string,
				data: string | ArrayBufferView,
				opts?: {flags: string},
			): void;
		};
	}
}
