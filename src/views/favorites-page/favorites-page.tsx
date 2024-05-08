'use client';

import { TopPage } from '@/widgets/top-page';
import { Image } from '@nextui-org/react';
import cn from 'clsx';
import { FC, memo } from 'react';
import cls from './favorites-page.module.scss';
import { FavoritesProducts } from './favorites-products';

export const FavoritesPage: FC = memo(() => {
	return (
		<div className={cn(cls.wrapper, 'content')}>
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
});
