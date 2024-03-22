'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { LocalstorageKeys } from '@/shared/const/localstorage';
import { useState } from 'react';

export const useLocalstorage = <T>(
	key: LocalstorageKeys,
	initialValue: T,
): [T, (value: T) => void] => {
	const isBrowser = typeof window !== 'undefined';
	if (!isBrowser) {
		return [initialValue, () => {}];
	}

	// Попытка получить сохраненное значение из localStorage
	const storedValue = localStorage.getItem(key);
	const initial = storedValue ? JSON.parse(storedValue) : initialValue;

	// Создание состояния для значения и функции для его обновления
	const [value, updateValue] = useState<T>(initial);

	// Функция для обновления значения в состоянии и сохранения его в localStorage
	const setValue = (newValue: T) => {
		updateValue(newValue);
		localStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, setValue];
};
