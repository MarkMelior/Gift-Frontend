import { LocalstorageKeys } from '@/shared/types/localstorage';

export const getLocalstorage = <T = boolean>(
	key: LocalstorageKeys,
): T | undefined => {
	if (typeof window === 'undefined') return undefined;

	const storedSettings = localStorage.getItem(key);
	return storedSettings ? (JSON.parse(storedSettings) as T) : undefined;
};
