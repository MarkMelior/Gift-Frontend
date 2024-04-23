'use client';

import { FC, memo } from 'react';
import 'swiper/css/pagination';
import { Product } from '../../model/types/product.type';
import { Card } from '../card/card';
import cls from './cards.module.scss';

export interface CardsProps {
	data: Product[] | undefined;
	size?: 'sm' | 'md';
}

export const Cards: FC<CardsProps> = memo(({ data, size }) => {
	if (!data) return null;

	return (
		<div className={cls.wrapper} data-size={size}>
			{data.map((cardData) => (
				<Card size={size} key={cardData.id} data={cardData} />
			))}
		</div>
	);
});
