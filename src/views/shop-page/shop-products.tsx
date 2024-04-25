'use client';

import {
	Cards,
	fetchProductData,
	getProductData,
	getProductError,
	getProductIsLoading,
	productReducer,
} from '@/entities/products';
import { sortReducer } from '@/features/sorts';
import { initialState } from '@/features/sorts/model/slice/sort.slice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface ShopProductsProps {}

const initialReducers: ReducersList = {
	product: productReducer,
	sort: sortReducer,
};

export const ShopProducts: FC<ShopProductsProps> = memo(() => {
	const dispatch = useAppDispatch();
	const productData = useSelector(getProductData);
	const isLoading = useSelector(getProductIsLoading);
	const error = useSelector(getProductError);

	const { age, category, maxPrice, sex, minPrice, sorting } = initialState;

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
		// eslint-disable-next-line
	}, []);

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<Cards data={productData} isLoading={isLoading} />
		</DynamicModuleLoader>
	);
});
