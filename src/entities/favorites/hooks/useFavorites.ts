import {
	getUserAuthData,
	getUserFavorites,
	userActions,
} from '@/entities/user';
import { setLocalstorage } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { ProductResponse } from '@melior-gift/zod-contracts';
import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toggleFavoritesProduct } from '../api/favorites.api';

export const useFavorites = (product: ProductResponse) => {
	const dispatch = useAppDispatch();
	const [isFavorites, setIsFavorites] = useState(false);
	const favorites = useSelector(getUserFavorites);
	const isUserLogged = useSelector(getUserAuthData);

	useEffect(() => {
		if (favorites && favorites.includes(product.article)) {
			setIsFavorites(true);
		} else {
			setIsFavorites(false);
		}
	}, [favorites, product.article]);

	const toggleFavorites = (e: MouseEvent) => {
		e.preventDefault();

		dispatch(userActions.toggleFavorites(product.article));

		if (isUserLogged) {
			dispatch(toggleFavoritesProduct(product.article));
		}
	};

	useEffect(() => {
		favorites && setLocalstorage(LocalstorageKeys.LIKED, favorites);
	}, [favorites]);

	return { isFavorites, toggleFavorites };
};
