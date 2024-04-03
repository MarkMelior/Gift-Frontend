import { LocalstorageKeys } from '@/shared/types/localstorage';

export const setLocalstorage = <T = boolean>(
	key: LocalstorageKeys,
	value: T,
) => {
	try {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(value));
		}
	} catch (e) {
		console.log(e);
	}
};
