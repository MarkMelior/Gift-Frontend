'use client';

import { Card as NextCard, Skeleton } from '@nextui-org/react';
import { FC, memo } from 'react';
import 'swiper/css/pagination';
import { Product } from '../../model/types/product.type';
import { Card } from '../card/card';
import cls from './cards.module.scss';

export interface CardsProps {
	data: Product[] | undefined;
	size?: 'sm' | 'md';
	isLoading?: boolean;
	error?: string;
}

export const Cards: FC<CardsProps> = memo(({ data, size, isLoading }) => {
	if (!data) return null;

	if (isLoading) {
		return (
			<NextCard className='w-[200px] space-y-5 p-4' radius='lg'>
				<Skeleton className='rounded-lg'>
					<div className='h-24 rounded-lg bg-default-300' />
				</Skeleton>
				<div className='space-y-3'>
					<Skeleton className='w-3/5 rounded-lg'>
						<div className='h-3 w-3/5 rounded-lg bg-default-200' />
					</Skeleton>
					<Skeleton className='w-4/5 rounded-lg'>
						<div className='h-3 w-4/5 rounded-lg bg-default-200' />
					</Skeleton>
					<Skeleton className='w-2/5 rounded-lg'>
						<div className='h-3 w-2/5 rounded-lg bg-default-300' />
					</Skeleton>
				</div>
			</NextCard>
		);
	}

	return (
		<div className={cls.wrapper} data-size={size}>
			{data.map((cardData) => (
				<Card size={size} key={cardData.id} data={cardData} />
			))}
		</div>
	);
});
