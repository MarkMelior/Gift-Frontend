'use client';

import { useFavoritesProducts } from '@/entities/favorites';
import { Cards, useGetProductsQuery } from '@/entities/products';
import { useGetProductsHistoryQuery } from '@/entities/products-history';
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { FC, memo } from 'react';
import cls from './favorites-page.module.scss';

// * SSR TEST
// async function getFavoritesProducts(
// 	articles: string[] | undefined,
// 	init?: RequestInit,
// ) {
// 	const articlesString = queryString.stringify({ articles });

// 	const res = await fetch(
// 		`http://localhost:8000/api/products/?${articlesString}`,
// 		init,
// 	);
// 	return res.json();
// }

export const FavoritesProducts: FC = memo(async () => {
	const { favoritesProducts, isLoading } = useFavoritesProducts();

	const { data: recommendedProducts, isLoading: isLoadingProducts } =
		useGetProductsQuery({ limit: 6 });

	const { data: productsHistory, isLoading: isLoadingProductsHistory } =
		useGetProductsHistoryQuery();

	// * SSR TEST
	// const articles = getLocalstorage<string[]>(LocalstorageKeys.LIKED);
	// console.log(articles);
	// const favoritesProducts = await getFavoritesProducts(articles);

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
				<Cards data={favoritesProducts} />
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
