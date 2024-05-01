import {
	getUserAuthData,
	getUserFavorites,
	userActions,
} from '@/entities/user';
import { setLocalstorage } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toggleFavoritesProduct } from '../api/products.api';
import { Product, ProductCard } from '../model/types/products.type';

export const useProducts = (data: ProductCard | Product) => {
	const dispatch = useAppDispatch();
	const [isFavorites, setIsFavorites] = useState(false);
	const favorites = useSelector(getUserFavorites);
	const isUserLogged = useSelector(getUserAuthData);

	useEffect(() => {
		if (favorites && favorites.includes(data.article)) {
			setIsFavorites(true);
		} else {
			setIsFavorites(false);
		}
	}, [favorites, data.article]);

	const toggleFavorites = (e: MouseEvent) => {
		e.preventDefault();

		dispatch(userActions.toggleFavorites(data.article));

		if (isUserLogged) {
			dispatch(toggleFavoritesProduct(data.article));
		}
	};

	useEffect(() => {
		setLocalstorage(LocalstorageKeys.LIKED, favorites);
	}, [favorites]);

	return { isFavorites, toggleFavorites };
};
