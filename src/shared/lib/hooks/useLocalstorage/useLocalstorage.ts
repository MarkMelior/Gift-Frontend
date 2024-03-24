'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { useEffect, useState } from 'react';

export const useLocalstorage = <T>(
	key: LocalstorageKeys,
	initialValue: T,
): [T, (value: T) => void] => {
	const isBrowser = typeof window !== 'undefined';
	if (!isBrowser) {
		return [initialValue, () => {}];
	}

	const [value, setValue] = useState<T>(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value, setValue]);

	return [value, setValue];
};
