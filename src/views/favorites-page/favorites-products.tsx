'use client';

import { useGetFavoritesProductsQuery } from '@/entities/favorites';
import { Cards, useGetProductsQuery } from '@/entities/products';
import { useGetProductsHistoryQuery } from '@/entities/products-history';
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { FC, memo } from 'react';
import cls from './favorites-page.module.scss';

export const FavoritesProducts: FC = memo(() => {
	const { data: favoritesProducts, isLoading } = useGetFavoritesProductsQuery();

	const { data: recommendedProducts, isLoading: isLoadingProducts } =
		useGetProductsQuery({ limit: 10 });

	const { data: productsHistory, isLoading: isLoadingProductsHistory } =
		useGetProductsHistoryQuery();

	return (
		<>
			{!favoritesProducts && !isLoading ? (
				<>
					<div className={cls.notFound}>
						<Link href='/shop' className='inline-block'>
							<Button
								starlight
								className='py-5 px-12 rounded-xl'
								customVariant='layer'
								startContent={<GiftIcon />}
							>
								За подарками!
							</Button>
						</Link>
						<span className='text-xs text-gray-500'>
							Избранные подарки не найдены
						</span>
					</div>
				</>
			) : (
				<Cards data={favoritesProducts} isLoading={isLoading} />
			)}
			<div className={cls.recommended}>
				<h3>Рекомендуемые товары</h3>
				<Cards
					size='sm'
					data={recommendedProducts}
					isLoading={isLoadingProducts}
				/>
			</div>
			{productsHistory && productsHistory.length > 0 && (
				<div className={cls.recommended}>
					<h3>Ваша история просмотра</h3>
					<Cards
						size='sm'
						data={productsHistory}
						isLoading={isLoadingProductsHistory}
					/>
				</div>
			)}
		</>
	);
});
