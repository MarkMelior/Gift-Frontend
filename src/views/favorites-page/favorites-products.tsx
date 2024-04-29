'use client';

import { Cards, useGetFavoritesProductsQuery } from '@/entities/products';
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { FC, memo } from 'react';
import cls from './favorites-page.module.scss';

export const FavoritesProducts: FC = memo(() => {
	// todo
	// const likedIdData = getLocalstorage<number[]>(LocalstorageKeys.LIKED);

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
					<h3>Вы недавно смотрели</h3>
					{/* <Cards data={historyData} /> */}
				</div>
			)}
		</>
	);
});
