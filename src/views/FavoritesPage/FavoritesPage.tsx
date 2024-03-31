'use client';

import { productData } from '@/db';
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { convertIdToProductData, getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { Button } from '@/shared/ui/Button';
import { Cards } from '@/shared/ui/Card';
import { TopPage } from '@/widgets/TopPage';
import { Image } from '@nextui-org/react';
import cn from 'clsx';
import Link from 'next/link';
import { FC } from 'react';
import cls from './FavoritesPage.module.scss';

export const FavoritesPage: FC = () => {
	const likedIdData = getLocalstorage<number[]>(LocalstorageKeys.LIKED);
	const historyIdData = getLocalstorage<number[]>(LocalstorageKeys.HISTORY);

	const likedData = convertIdToProductData(likedIdData, productData);
	const historyData = convertIdToProductData(historyIdData, productData);

	return (
		<div className={cn(cls.wrapper, 'content')}>
			<TopPage
				compact
				title='Избранное'
				description={
					!likedData.length
						? 'Вы ещё не добавили подарки в избранное, нужно это исправить'
						: 'Войдите в аккаунт, чтобы избранные товары сохранялись в облаке'
				}
				note='Моё избранное'
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
			<Cards data={likedData} />
			{!likedData.length ? (
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
						<Cards data={productData} />
					</div>
				</>
			) : (
				<div className={cls.recommended}>
					<h3>Вы недавно смотрели</h3>
					<Cards data={historyData} />
				</div>
			)}
		</div>
	);
};
