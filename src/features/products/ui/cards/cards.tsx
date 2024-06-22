'use client';

import { useDelay } from '@/shared/lib/hooks';
import { ErrorScreen } from '@/shared/ui/errors';
import { ProductResponse } from '@melior-gift/zod-contracts';
import { FC } from 'react';
import 'swiper/css/pagination';
import { Card } from '../card/card';
import { CardSkeleton } from '../card/card.skeleton';
import cls from './cards.module.scss';

export interface CardsProps {
	data: ProductResponse[] | undefined;
	isLoading?: boolean;
	error?: string;
	skeletonCount?: number;
	size?: 'sm' | 'md';
}

export const Cards: FC<CardsProps> = ({
	data,
	isLoading,
	error,
	size,
	skeletonCount,
}) => {
	const isTime = useDelay();

	if ((!isLoading && !data && isTime) || error) {
		return <ErrorScreen description={error && error} />;
	}

	if (!isLoading && data && data.length === 0) {
		return <ErrorScreen typeError='not-found-search' />;
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
};
