'use client';

import { HeartIcon } from '@/shared/assets/icon/Heart';
import { Button } from '@/shared/ui/Button';
import { FC, MouseEvent, useEffect, useState } from 'react';
import 'swiper/css/pagination';

export interface CardLikeProps {
	id: number;
}

export const CardLike: FC<CardLikeProps> = ({ id }) => {
	const [isLiked, setIsLiked] = useState<boolean>(false);

	useEffect(() => {
		const likedProducts = JSON.parse(
			localStorage.getItem('likedProducts') || '[]',
		);
		setIsLiked(likedProducts.includes(id));
	}, [id]);

	const toggleLike = (e: MouseEvent) => {
		e.preventDefault();

		const likedProducts = JSON.parse(
			localStorage.getItem('likedProducts') || '[]',
		);
		const productId = id;

		if (!isLiked) {
			likedProducts.push(productId);
		} else {
			const index = likedProducts.indexOf(productId);
			if (index !== -1) {
				likedProducts.splice(index, 1);
			}
		}

		localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
		setIsLiked(!isLiked);
	};

	return (
		<Button
			className='p-2 rounded-full'
			hoverColor={isLiked ? '255, 66, 66' : 'var(--color-main-inverted-rgb)'}
			data-selected={isLiked}
			clear
			slice
			onClick={(e) => toggleLike(e)}
			isIconOnly
			startContent={<HeartIcon />}
		/>
	);
};
