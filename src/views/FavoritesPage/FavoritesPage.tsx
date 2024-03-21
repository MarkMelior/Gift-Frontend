'use client';

/* eslint-disable i18next/no-literal-string */
import { GiftIcon } from '@/shared/assets/icon/Gift';
import { Link } from '@/shared/config/i18n/navigation';
import { getStorageData } from '@/shared/lib/getStorageData';
import { Button } from '@/shared/ui/Button';
import { Cards } from '@/shared/ui/Card';
import { TopPage } from '@/widgets/TopPage';
import { Image } from '@nextui-org/react';
import cn from 'clsx';
import { FC } from 'react';
import { cardData } from '../ShopPage/ShopPage';
import cls from './FavoritesPage.module.scss';

export const FavoritesPage: FC = () => {
	// const t = useTranslations('Favorites');

	const filteredData = getStorageData(cardData, 'likedProducts');

	return (
		<div className={cn(cls.wrapper, 'content')}>
			<TopPage
				compact
				title='Избранное'
				description={
					!filteredData
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
			<Cards data={filteredData} />
			{!filteredData && (
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
						<Cards data={cardData} />
					</div>
				</>
			)}
		</div>
	);
};
