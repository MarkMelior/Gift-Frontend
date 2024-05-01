import { LocalstorageKeys } from '@/shared/types/localstorage';

export const getLocalstorage = <T = boolean>(
	key: LocalstorageKeys,
	initialValue?: T,
): T | undefined => {
	if (typeof window === 'undefined') return initialValue;

	try {
		const storedSettings = localStorage.getItem(key);
		return storedSettings ? (JSON.parse(storedSettings) as T) : initialValue;
	} catch (e) {
		console.log(`getLocalstorage error: ${e}`);
		return initialValue;
	}
};
