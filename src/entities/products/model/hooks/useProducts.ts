import { userActions } from '@/entities/user';
import { useAppDispatch } from '@/shared/lib/hooks';
import { MouseEvent } from 'react';
import { toggleFavoritesProduct } from '../api/products.api';
import { Product, ProductCard } from '../types/products.type';

export const useProducts = (data: ProductCard | Product) => {
	const dispatch = useAppDispatch();

	const toggleFavorites = (e: MouseEvent) => {
		e.preventDefault();

		dispatch(userActions.toggleFavorites(data.article));
		dispatch(toggleFavoritesProduct(data.article));
	};

	return { toggleFavorites };
};
