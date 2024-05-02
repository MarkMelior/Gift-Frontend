'use client';

import { Cards } from '@/entities/products';
import { useGetFavoritesProductsQuery } from '@/features/favorites';
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { FC, memo } from 'react';
import cls from './favorites-page.module.scss';

export const FavoritesProducts: FC = memo(() => {
	const { data: favoritesProducts, isLoading } = useGetFavoritesProductsQuery();

	if (isLoading) return <div>ЗАГРУЗКА ДАТЫ!</div>;

	return (
		<>
			<Cards data={favoritesProducts} />
			{!favoritesProducts ? (
				<>
					<div className={cls.notFound}>
						<Link href='/shop' style={{ display: 'inline-block' }}>
							<Button
								starlight
								className='py-5 px-12 rounded-xl'
								customVariant='layer'
								startContent={<GiftIcon />}
							>
								За подарками!
							</Button>
						</Link>
					</div>
					<div className={cls.recommended}>
						<h3>Рекомендуемые товары</h3>
						{/* <Cards data={productData} /> */}
					</div>
				</>
			) : (
				<div className={cls.recommended}>
					<h3>Просмотренные</h3>
					{/* <Cards data={historyData} /> */}
				</div>
			)}
		</>
	);
});
