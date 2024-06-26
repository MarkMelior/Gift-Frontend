'use client';

import { useFavoritesProducts } from '@/features/favorites';
import {
	Cards,
	useGetProductsHistoryQuery,
	useGetProductsQuery,
} from '@/features/products';
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { FC } from 'react';
import cls from './favorites-page.module.scss';

export const FavoritesProducts: FC = () => {
	const { favoritesProducts, isLoading } = useFavoritesProducts();

	const { data, isLoading: isLoadingProducts } = useGetProductsQuery({
		limit: 6,
	});
	const recommendedProducts = data?.products;

	const { data: productsHistory, isLoading: isLoadingProductsHistory } =
		useGetProductsHistoryQuery();

	return (
		<>
			{!favoritesProducts && !isLoading ? (
				<>
					<div className={cls.notFound}>
						<Button
							as={Link}
							href='/shop'
							starlight
							className='py-5 px-12 rounded-xl'
							customVariant='layer'
							startContent={<GiftIcon />}
						>
							За подарками!
						</Button>
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
};
