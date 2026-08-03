export default class FifoCache<TKey, TValue> {
	#cache = new Map<TKey, TValue>();
	#keys: TKey[] = [];

	maxItems = 10;

	get(key: TKey): TValue | undefined {
		return this.#cache.get(key);
	}

	async getOrInsertComputed(
		key: TKey,
		callback: () => Promise<TValue>,
	): Promise<TValue> {
		const value = this.get(key);
		if (value) {
			return value;
		}

		const newValue = await callback();
		this.set(key, newValue);
		return newValue;
	}

	set(key: TKey, value: TValue) {
		if (!this.#keys.includes(key)) {
			this.#keys.push(key);
		}
		this.#cache.set(key, value);

		if (this.#keys.length > this.maxItems) {
			const firstKey = this.#keys.shift();
			if (firstKey) {
				this.#cache.delete(firstKey);
			}
		}
	}

	reset() {
		this.#cache.clear();
		this.#keys = [];
	}
}
