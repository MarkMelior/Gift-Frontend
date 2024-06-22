'use client';

import { LocalstorageKeys } from '@/shared/types/localstorage';
import { MouseEvent, useState } from 'react';
import { getLocalstorage, setLocalstorage } from '../../features';

export const useLocalstorageArray = <T>(
	key: LocalstorageKeys,
	initialValue: T,
) => {
	const [isAdded, setIsAdded] = useState<boolean>(() => {
		const storedItems = getLocalstorage<T[]>(key) ?? [];

		return storedItems.includes(initialValue);
	});

	if (typeof window === 'undefined') {
		return {
			isAdded: false,
			toggle: () => {},
			add: () => {},
			remove: () => {},
		};
	}

	const updateLocalStorage = (products: T[]) => {
		setLocalstorage(key, products);
		setIsAdded(!isAdded);
	};

	const toggle = (e: MouseEvent) => {
		e.preventDefault();

		const storedItems = getLocalstorage<T[]>(key) ?? [];

		const updatedItems = isAdded
			? storedItems.filter((item) => item !== initialValue)
			: [...storedItems, initialValue];

		updateLocalStorage(updatedItems);
	};

	const add = (e: MouseEvent) => {
		e.preventDefault();

		const storedItems = getLocalstorage<T[]>(key) ?? [];

		if (!isAdded) {
			const updatedItems = [...storedItems, initialValue];
			updateLocalStorage(updatedItems);
		}
	};

	const remove = (e: MouseEvent) => {
		e.preventDefault();

		const storedItems = getLocalstorage<T[]>(key) ?? [];

		const updatedItems = storedItems.filter((item) => item !== initialValue);
		updateLocalStorage(updatedItems);
	};

	return { isAdded, toggle, add, remove };
};
