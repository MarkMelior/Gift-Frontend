'use client';

import { Cards, useGetProductsQuery } from '@/entities/products';
import { Sorts, getSort, sortReducer } from '@/features/sorts';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { Blackhole } from '@/shared/ui/blackhole';
import { Button } from '@/shared/ui/button';
import { NavigationPanel } from '@/widgets/navigation-panel';
import { TopPage } from '@/widgets/top-page';
import { ProductFindRequest, SortFilters } from '@melior-gift/zod-contracts';
import { Image, Textarea } from '@nextui-org/react';
import cn from 'clsx';
import { FC, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from './shop-page.module.scss';

const initialReducers: ReducersList = {
	sort: sortReducer,
};

export const ShopPage: FC = memo(() => {
	const sort = useSelector(getSort);
	const FindProducts: ProductFindRequest = {
		limit: '100',
		filters: [...sort.category, sort.age, sort.sex].join('-') as SortFilters,
		maxPrice: String(sort.maxPrice),
		minPrice: String(sort.minPrice),
		sort: sort.sorting,
	};
	const [fetchData, setFetchData] = useState(FindProducts);

	const {
		data: products,
		isLoading,
		error,
	} = useGetProductsQuery(fetchData, { skip: !fetchData });

	const handleFetch = useCallback(() => {
		setFetchData(FindProducts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sort]);

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<TopPage
				note='Найти подарок - легко'
				title='Melior Gift'
				description='Находить креативные подарки теперь легко и приятно.'
				compact
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
				<Sorts onFetch={() => handleFetch()} />
				<div className={cls.block}>
					<div className={cls.ai}>
						<Textarea
							maxRows={2}
							maxLength={250}
							className={cls.textarea}
							id='textarea'
							aria-label='Текстовое поле ввода для поиска подарка нейросетью'
							placeholder='Введи текстовый запрос и нейросеть поможет тебе подобрать подарок'
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
					</div>
					<Cards
						data={products}
						isLoading={isLoading}
						// ! fix error type
						error={error && 'status' in error && error.data.message}
					/>
				</div>
			</div>
		</DynamicModuleLoader>
	);
});
