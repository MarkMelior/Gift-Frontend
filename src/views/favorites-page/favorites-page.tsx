'use client';

import { Blackhole } from '@/shared/ui/blackhole';
import { TopPage } from '@/widgets/top-page';
import { Image } from '@nextui-org/react';
import cn from 'clsx';
import { FC } from 'react';
import cls from './favorites-page.module.scss';
import { FavoritesProducts } from './favorites-products';

export const FavoritesPage: FC = () => {
	return (
		<div className={cn(cls.wrapper, 'content')}>
			<Blackhole flip className='!mb-[-200px]' />
			<TopPage
				compact
				note='Мой выбор'
				title='Избранное'
				description={'Сохраняй подарки в избранное, чтобы не потерять (:'}
				imageContent={
					<Image
						src='/images/pages/heart.png'
						alt='image'
						width={1080}
						height={1080}
						className='noselect'
					/>
				}
			/>
			<FavoritesProducts />
		</div>
	);
};
