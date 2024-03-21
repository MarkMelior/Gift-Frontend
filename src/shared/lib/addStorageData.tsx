'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { StorageDataProps } from './getStorageData';

export const addStorageData = (id: number, item: StorageDataProps) => {
	const [isLiked, setIsLiked] = useState<boolean>(false);

	useEffect(() => {
		const likedProducts = JSON.parse(localStorage.getItem(item) || '[]');
		setIsLiked(likedProducts.includes(id));
	}, [id, item]);

	const toggleLike = (e: MouseEvent) => {
		e.preventDefault();

		const likedProducts = JSON.parse(localStorage.getItem(item) || '[]');
		const productId = id;

		if (!isLiked) {
			likedProducts.push(productId);
		} else {
			const index = likedProducts.indexOf(productId);
			if (index !== -1) {
				likedProducts.splice(index, 1);
			}
		}

		localStorage.setItem(item, JSON.stringify(likedProducts));
		setIsLiked(!isLiked);
	};

	return { isLiked, toggleLike };
};
