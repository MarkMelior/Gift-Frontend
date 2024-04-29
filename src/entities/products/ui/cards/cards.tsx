'use client';

import { ErrorScreen } from '@/shared/ui/errors';
import { FC, memo, useEffect, useState } from 'react';
import 'swiper/css/pagination';
import { ProductCard } from '../../model/types/products.type';
import { Card } from '../card/card';
import { CardSkeleton } from '../card/card.skeleton';
import cls from './cards.module.scss';

export interface CardsProps {
	data: ProductCard[] | undefined;
	isLoading?: boolean;
	error?: string;
	skeletonCount?: number;
	size?: 'sm' | 'md';
}

export const Cards: FC<CardsProps> = memo(
	({ data, isLoading, error, size, skeletonCount }) => {
		const [isTime, setIsTime] = useState(false);

		useEffect(() => {
			const timer = setTimeout(() => {
				setIsTime(true);
			}, 3000);

			return () => clearTimeout(timer);
		}, []);

		if ((!isLoading && !data && isTime) || error) {
			return <ErrorScreen description={error && error} />;
		}

		if (!isLoading && data && data.length === 0) {
			return (
				<ErrorScreen
					title='Продукты не найдены'
					description='Измените параметры поиска'
				/>
			);
		}

		return (
			<div className={cls.wrapper} data-size={size}>
				{isLoading || !data ? (
					<CardSkeleton size={size} skeletonCount={skeletonCount} />
				) : (
					data.map((cardData) => (
						<Card size={size} key={cardData.article} data={cardData} />
					))
				)}
			</div>
		);
	},
);
