export default function reverseObject<
	K extends string | number,
	V extends string | number,
>(obj: Record<K, V>) {
	return Object.fromEntries(Object.entries<V>(obj).map(([k, v]) => [v, k]));
}
