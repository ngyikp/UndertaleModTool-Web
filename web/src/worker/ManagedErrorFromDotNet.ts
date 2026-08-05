// ManagedError: https://github.com/dotnet/runtime/blob/ea3f7f141e0596cab37785d305910e64d031ab29/src/mono/browser/runtime/marshal.ts#L397
export class ManagedErrorFromDotNet extends Error {
	override stack: string;

	constructor(message: string, stack: string) {
		super(message);

		this.message = message;
		this.stack = stack;
	}
}
