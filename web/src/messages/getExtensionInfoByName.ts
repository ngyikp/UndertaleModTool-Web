import {z} from 'zod/mini';

import reverseObject from '../util/reverseObject';
import {sendMessageToWorkerAsPromise} from '../worker/worker-handler';

// Ported from UndertaleModLib/Models/UndertaleExtension.cs

/// <summary>
/// The type of what the option value is.
/// </summary>
const OptionKind = {
	/// <summary>
	/// The option value is a boolean-
	/// </summary>
	Boolean: 0,

	/// <summary>
	/// The option value is a number.
	/// </summary>
	Number: 1,

	/// <summary>
	/// The option value is a string.
	/// </summary>
	String: 2,
} as const;

export const OptionKindValues = reverseObject(OptionKind);

export type GetExtensionInfoByNameRequest = {
	type: 'getExtensionInfoByName';
	name: string;
};

export type GetExtensionInfoByNameResult = ExtensionInfoType;

// Info about UndertaleExtension. Keep this in sync with `src/Serializers/ExtensionInfo.cs`
export const ExtensionInfoSchema = z.object({
	Id: z.int(),
	Version: z.nullable(z.string()),
	FileNames: z.array(z.string()),
	Options: z.array(
		z.object({
			Name: z.string(),
			Value: z.string(),
			Kind: z.enum(OptionKind),
		}),
	),
});

type ExtensionInfoType = z.infer<typeof ExtensionInfoSchema>;

export function getExtensionInfoByName(name: string) {
	return sendMessageToWorkerAsPromise<GetExtensionInfoByNameResult>({
		type: 'getExtensionInfoByName',
		name,
	});
}
