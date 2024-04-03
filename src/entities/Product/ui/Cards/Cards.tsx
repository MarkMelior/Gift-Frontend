'use client';

import { ProductDataProps } from '@/entities/Product/model/types/product';
import { FC, memo } from 'react';
import 'swiper/css/pagination';
import { Card } from '../Card/Card';
import cls from './Cards.module.scss';

export interface CardsProps {
	data: ProductDataProps[] | false;
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
