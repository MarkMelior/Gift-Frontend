'use client';

import { Cards, getProducts } from '@/entities/products';
import {
	Sorts,
	getSort,
	getSortSearchParams,
	sortActions,
} from '@/features/sorts';
import { useAppDispatch } from '@/shared/lib/hooks';
import { ProductResponse } from '@melior-gift/zod-contracts';
import cn from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from './shop-page.module.scss';

export const ShopBlock = () => {
	const sort = useSelector(getSort);
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();

	const [products, setProducts] = useState<ProductResponse[] | undefined>();
	const [isLoading, setIsLoading] = useState(true);

	const handleFetch = useCallback(() => {
		dispatch(
			getProducts({
				limit: 100,
				filters: [...sort.category, sort.age, sort.sex],
				maxPrice: sort.maxPrice,
				minPrice: sort.minPrice,
				sort: sort.sorting,
			}),
		).then((res) => {
			setProducts(res.data?.products);
			setIsLoading(false);
		});
	}, [dispatch, sort]);

	useEffect(() => {
		const sortState = getSortSearchParams(searchParams);
		dispatch(sortActions.setSortState(sortState));
	}, [dispatch, searchParams]);

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted) handleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	return (
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
	);
};
