'use client';

import { ProductDataProps } from '@/shared/types/product';
import { FC } from 'react';
import 'swiper/css/pagination';
import { Card } from '../Card/Card';
import cls from './Cards.module.scss';

export interface CardsProps {
	data: ProductDataProps[] | false;
}

export const Cards: FC<CardsProps> = ({ data }) => {
	if (!data) return null;

	return (
		<div className={cls.wrapper}>
			{data.map((cardData) => (
				<Card key={cardData.id} data={cardData} />
			))}
		</div>
	);
};
