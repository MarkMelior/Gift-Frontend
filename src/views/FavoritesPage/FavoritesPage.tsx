'use client';

import { productData } from '@/db';
import { Cards } from '@/entities/Product';
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { convertIdToProductData, getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { Button } from '@/shared/ui/Button';
import { TopPage } from '@/widgets/TopPage';
import { Image } from '@nextui-org/react';
import cn from 'clsx';
import Link from 'next/link';
import { FC, memo, useEffect, useState } from 'react';
import cls from './FavoritesPage.module.scss';

export const FavoritesPage: FC = memo(() => {
	const likedIdData = getLocalstorage<number[]>(LocalstorageKeys.LIKED);
	const historyIdData = getLocalstorage<number[]>(LocalstorageKeys.HISTORY);

	const likedData = convertIdToProductData(likedIdData, productData);
	const historyData = convertIdToProductData(historyIdData, productData);

	// const productsWithoutDiscount = likedData.reduce(
	// 	(acc, item) => acc + item.markets[0].oldPrice,
	// 	0,
	// );
	// const productsWithDiscount = likedData.reduce(
	// 	(acc, item) => acc + item.markets[0].price,
	// 	0,
	// );

	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!isMounted) return;

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
			{/* <Dropdown placement='top-start'>
				<DropdownTrigger>
					<Button className='rounded-full text-sm' customVariant='glowing'>
						Статистика
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					disabledKeys={['stats']}
					aria-label='Static Actions'
					className={cls.stats}
				>
					<DropdownItem isReadOnly key='stats'>
						<h6>Моя статистика</h6>
					</DropdownItem>
					<DropdownItem key='look'>{`👀 Я посмотрел ${historyData.length} подарков`}</DropdownItem>
					<DropdownItem key='liked'>{`❤️ Я добавил в избранное ${likedData.length} подарков`}</DropdownItem>
					<DropdownItem key='without-discount'>{`😳 Сумма избранных подарков без скидок ${convertCurrency(productsWithoutDiscount)}`}</DropdownItem>
					<DropdownItem key='with-discount'>{`💸 Сумма избранных подарков со скидками ${convertCurrency(productsWithDiscount)}`}</DropdownItem>
					<DropdownItem key='discount'>{`🔥 Сумма скидок ${convertCurrency(productsWithoutDiscount - productsWithDiscount)}`}</DropdownItem>
				</DropdownMenu>
			</Dropdown> */}
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
});
