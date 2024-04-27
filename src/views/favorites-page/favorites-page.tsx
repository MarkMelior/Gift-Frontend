'use client';

import { productsFavoritesReducer } from '@/entities/products';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { TopPage } from '@/widgets/top-page';
import { Image } from '@nextui-org/react';
import cn from 'clsx';
import { FC, memo } from 'react';
import cls from './favorites-page.module.scss';
import { FavoritesProducts } from './favorites-products';

const initialReducers: ReducersList = {
	productsFavorites: productsFavoritesReducer,
};

export const FavoritesPage: FC = memo(() => {
	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<div className={cn(cls.wrapper, 'content')}>
				<TopPage
					compact
					title='Избранное'
					description={'Сохраняйте подарки в избранное, чтобы не потерять (:'}
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
				<FavoritesProducts />
			</div>
		</DynamicModuleLoader>
	);
});
