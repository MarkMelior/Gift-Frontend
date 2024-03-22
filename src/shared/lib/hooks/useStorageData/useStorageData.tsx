'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { LocalstorageKeys } from '@/shared/types';
import { DataCardProps } from '@/shared/ui/Card';
import { MouseEvent, useEffect, useState } from 'react';

export const useStorageData = (data: DataCardProps, item: LocalstorageKeys) => {
	const [isAdded, setIsAdded] = useState<boolean>(false);

	useEffect(() => {
		const products = JSON.parse(localStorage.getItem(item) || '[]');
		setIsAdded(products.includes(data.id));
	}, [data.id, item]);

	const toggle = (e: MouseEvent) => {
		e.preventDefault();

		const products = JSON.parse(localStorage.getItem(item) || '[]');

		if (!isAdded) {
			products.push(data.id);
		} else {
			const index = products.indexOf(data.id);
			if (index !== -1) {
				products.splice(index, 1);
			}
		}

		localStorage.setItem(item, JSON.stringify(products));
		setIsAdded(!isAdded);
	};

	const add = (e: MouseEvent) => {
		e.preventDefault();

		const products = JSON.parse(localStorage.getItem(item) || '[]');

		if (!isAdded) {
			products.push(data.id);
		}

		localStorage.setItem(item, JSON.stringify(products));
		setIsAdded(true);
	};

	const remove = (e: MouseEvent) => {
		e.preventDefault();

		const products = JSON.parse(localStorage.getItem(item) || '[]');

		const index = products.indexOf(data.id);
		if (index !== -1) {
			products.splice(index, 1);
		}

		localStorage.setItem(item, JSON.stringify(products));
		setIsAdded(false);
	};

	// const getData = (max?: number) => {
	// 	const isAdded = (id: number) => {
	// 		const favorites: number[] = JSON.parse(
	// 			localStorage.getItem(item) || '[]',
	// 		);
	// 		return favorites.includes(id);
	// 	};

	// 	const filteredData = data
	// 		.filter((el: { id: number }) => isAdded(el.id))
	// 		.reverse()
	// 		.slice(0, max);

	// 	if (!filteredData.length) return false;

	// 	return filteredData;
	// };

	return { isAdded, toggle, add, remove };
};
