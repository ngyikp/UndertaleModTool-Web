import type {EmscriptenModule} from '../../public/dotnet/wwwroot/_framework/dotnet';
import type {ModelTypeKeys} from '../types/ModelType';

export type AppExports = {
	UndertaleModToolWASM: {
		ReadFile(fileName: string): string;
		GetEntriesByModelType(modelType: ModelTypeKeys): string;
		GetCodeInfoByName(name: string): string;
		GetSoundInfoByName(name: string): string;
		GetEmbeddedTextureImageById(id: number): Uint8Array<ArrayBuffer>;
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
