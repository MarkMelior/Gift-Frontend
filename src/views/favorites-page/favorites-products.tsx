'use client';

import { ReduxStoreWithManager } from '@/app/store';
import {
	Cards,
	fetchFavoritesProducts,
	getProductsFavorites,
} from '@/entities/products';
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { FC, memo, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import cls from './favorites-page.module.scss';

export const FavoritesProducts: FC = memo(() => {
	// todo
	// const likedIdData = getLocalstorage<number[]>(LocalstorageKeys.LIKED);

	const dispatch = useAppDispatch();
	const store = useStore() as ReduxStoreWithManager;

	useEffect(() => {
		dispatch(fetchFavoritesProducts());
	}, [dispatch, store.reducerManager]);

	const likedData = useSelector(getProductsFavorites).data;
	const likedDataIsLoading = useSelector(getProductsFavorites).isLoading;

	if (likedDataIsLoading) return <div>ЗАГРУЗКА ДАТЫ!</div>;

	return (
		<>
			<Cards data={likedData} />
			{!likedData ? (
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
