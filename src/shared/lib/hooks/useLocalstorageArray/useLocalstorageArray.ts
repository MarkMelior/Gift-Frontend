'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { MouseEvent, useState } from 'react';

export const useLocalstorageArray = <T>(
	key: LocalstorageKeys,
	initialValue: T,
) => {
	const isBrowser = typeof window !== 'undefined';
	if (!isBrowser) {
		return {
			isAdded: false,
			toggle: () => {},
			add: () => {},
			remove: () => {},
		};
	}

	const [isAdded, setIsAdded] = useState<boolean>(() => {
		const storedItems: T[] = JSON.parse(localStorage.getItem(key) || '[]');

		return storedItems.includes(initialValue);
	});

	const updateLocalStorage = (products: T[]) => {
		localStorage.setItem(key, JSON.stringify(products));
		setIsAdded(!isAdded);
	};

	const toggle = (e: MouseEvent) => {
		e.preventDefault();

		const storedItems: T[] = JSON.parse(localStorage.getItem(key) || '[]');

		const updatedItems = isAdded
			? storedItems.filter((item) => item !== initialValue)
			: [...storedItems, initialValue];

		updateLocalStorage(updatedItems);
	};

	const add = (e: MouseEvent) => {
		e.preventDefault();

		const storedItems: T[] = JSON.parse(localStorage.getItem(key) || '[]');

		if (!isAdded) {
			const updatedItems = [...storedItems, initialValue];
			updateLocalStorage(updatedItems);
		}
	};

	const remove = (e: MouseEvent) => {
		e.preventDefault();

		const storedItems: T[] = JSON.parse(localStorage.getItem(key) || '[]');

		const updatedItems = storedItems.filter((item) => item !== initialValue);
		updateLocalStorage(updatedItems);
	};

	return { isAdded, toggle, add, remove };
};
