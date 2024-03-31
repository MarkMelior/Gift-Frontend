import { LocalstorageKeys } from '@/shared/types/localstorage';

export const setLocalstorage = <T = boolean>(
	key: LocalstorageKeys,
	value: T,
) => {
	localStorage.setItem(key, JSON.stringify(value));
};
