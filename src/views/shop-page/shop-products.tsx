'use client';

import {
	Cards,
	fetchProductData,
	getProductData,
	getProductError,
	getProductIsLoading,
} from '@/entities/products';
import { getSortSearchparams } from '@/features/sorts/model/features/getSortSearchparams';
import { useAppDispatch } from '@/shared/lib/hooks';
import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface ShopProductsProps {}

export const ShopProducts: FC<ShopProductsProps> = memo(() => {
	const { age, category, maxPrice, sex, minPrice, sorting } =
		getSortSearchparams();

	const dispatch = useAppDispatch();
	const productData = useSelector(getProductData);
	const isLoading = useSelector(getProductIsLoading);
	const error = useSelector(getProductError);

	useEffect(() => {
		dispatch(
			fetchProductData({
				limit: 20,
				filters: [...category, ...age, ...sex],
				maxPrice,
				minPrice,
				sort: sorting,
			}),
		);
	}, [age, category, dispatch, maxPrice, minPrice, sex, sorting]);

	if (isLoading) {
		return <div>Загрузка идёт!</div>;
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	return <Cards data={productData} />;
});
