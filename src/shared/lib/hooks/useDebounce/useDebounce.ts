import { useEffect, useState } from 'react';

type DebounceCallback<T> = (value: T) => void;

export const useDebounce = <T>(
	callback: DebounceCallback<T>,
	delay: number,
) => {
	const [debouncedValue, setDebouncedValue] = useState<T | null>(null);

	useEffect(() => {
		if (debouncedValue !== null) {
			const handler = setTimeout(() => {
				callback(debouncedValue);
			}, delay);

			return () => {
				clearTimeout(handler);
			};
		}
	}, [debouncedValue, delay, callback]);

	return setDebouncedValue;
};
