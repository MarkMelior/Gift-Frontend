'use client';

import { ProductDataProps } from '@/shared/types/product';
import { FC } from 'react';
import 'swiper/css/pagination';
import { Card } from '../Card/Card';
import cls from './Cards.module.scss';

export interface CardsProps {
	data: ProductDataProps[] | false;
	size?: 'sm' | 'md';
}

export const Cards: FC<CardsProps> = ({ data, size }) => {
	if (!data) return null;

	return (
		<div className={cls.wrapper} data-size={size}>
			{data.map((cardData) => (
				<Card size={size} key={cardData.id} data={cardData} />
			))}
		</div>
	);
};
