'use client';

import { Cards, useGetProductsQuery } from '@/entities/products';
import { Sorts, getSort } from '@/features/sorts';
import { Blackhole } from '@/shared/ui/blackhole';
import { NavigationPanel } from '@/widgets/navigation-panel';
import { TopPage } from '@/widgets/top-page';
import cn from 'clsx';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from './shop-page.module.scss';

export const ShopPage: FC = memo(() => {
	const sort = useSelector(getSort);

	const FindProducts = useMemo(
		() => ({
			limit: 100,
			filters: [...sort.category, sort.age, sort.sex],
			maxPrice: sort.maxPrice,
			minPrice: sort.minPrice,
			sort: sort.sorting,
		}),
		[sort],
	);

	const [fetchData, setFetchData] = useState(FindProducts);

	const { data: products, isLoading, error } = useGetProductsQuery(fetchData);

	const handleFetch = useCallback(() => {
		setFetchData(FindProducts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [FindProducts]);

	return (
		<>
			<TopPage
				note='Найти подарок - легко'
				title='Melior Gift'
				description='Находить креативные подарки теперь легко и приятно.'
				compact
				imageContent={
					<img src='/images/pages/gift.png' alt='image' className='noselect' />
				}
			/>
			<div className={cls.navigation}>
				<Blackhole />
				<NavigationPanel />
			</div>
			<div className={cn(cls.wrapper, 'content')}>
				<Sorts onFetch={handleFetch} />
				<div className={cls.block}>
					{/* <div className={cls.ai}>
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
					</div> */}
					<Cards
						data={products}
						isLoading={isLoading}
						// ! fix error type
						// error={error && 'status' in error && error.data.message}
					/>
				</div>
			</div>
		</>
	);
});
