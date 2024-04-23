'use client';

import { productReducer } from '@/entities/products';
import { Sorts, sortReducer } from '@/features/sorts';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { Blackhole } from '@/shared/ui/blackhole';
import { NavigationPanel } from '@/widgets/navigation-panel';
import { TopPage } from '@/widgets/top-page';
import { Image } from '@nextui-org/react';
import cn from 'clsx';
import { FC, memo } from 'react';
import cls from './shop-page.module.scss';
import { ShopProducts } from './shop-products';

const initialReducers: ReducersList = {
	sort: sortReducer,
	product: productReducer,
};

export const ShopPage: FC = memo(() => {
	return (
		<>
			<DynamicModuleLoader reducers={initialReducers}>
				<TopPage
					compact
					title='Melior Gift'
					description='Каждый подарок может быть искусством'
					note='Лучший выбор в мире'
					imageContent={
						<Image
							src='/images/pages/gift.png'
							alt='image'
							width={371}
							height={419}
							className='noselect'
						/>
					}
				/>
				<div className={cls.navigation}>
					<Blackhole />
					<NavigationPanel />
				</div>
				<div className={cn(cls.wrapper, 'content')}>
					<Sorts />
					<div className={cls.block}>
						{/* <div className={cls.ai}>
						<Textarea
							maxRows={2}
							maxLength={250}
							className={cls.textarea}
							id='textarea'
							aria-label='Текстовое поле ввода для поиска подарка нейросетью'
							placeholder='Введите текстовый запрос и нейросеть поможет вам подобрать подарок'
						/>
						<Button
							aria-labelledby='textarea'
							customVariant='layer'
							hoverColor='149, 66, 255'
							starlight
							className='py-3 px-8 rounded-lg text-sm'
							startContent={
								<Image
									src='/images/icons/stars-heading-colored.svg'
									alt='test'
									width={22}
									height={22}
									style={{ minWidth: '22px', height: '22px' }}
									className='noselect'
								/>
							}
						>
							Найти подарок
						</Button>
					</div> */}
						<ShopProducts />
					</div>
				</div>
			</DynamicModuleLoader>
		</>
	);
});
