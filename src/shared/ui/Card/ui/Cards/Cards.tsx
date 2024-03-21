'use client';

import { FC } from 'react';
import 'swiper/css/pagination';
import { Card, DataCardProps } from '../Card/Card';
import cls from './Cards.module.scss';

export interface CardsProps {
	data: DataCardProps[];
}

export const Cards: FC<CardsProps> = ({ data }) => {
	if (!data.length) return null;

	return (
		<div className={cls.wrapper}>
			{data.map((cardData) => (
				<Card key={cardData.id} data={cardData} />
			))}
		</div>
	);
};
