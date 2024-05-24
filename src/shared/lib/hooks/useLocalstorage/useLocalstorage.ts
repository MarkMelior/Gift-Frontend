'use client';

import { LocalstorageKeys } from '@/shared/types/localstorage';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { setLocalstorage } from '../../features';

export default function useLocalStorage<T>(
	key: LocalstorageKeys,
	defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
	const isMounted = useRef(false);
	const [value, setValue] = useState<T>(defaultValue);

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				setValue(JSON.parse(item));
			}
		} catch (e) {
			console.log('useLocalStorage error:', e);
		}
		return () => {
			isMounted.current = false;
		};
	}, [key]);

	useEffect(() => {
		if (isMounted.current) {
			setLocalstorage(key, value);
		} else {
			isMounted.current = true;
		}
	}, [key, value]);

	return [value, setValue];
}
