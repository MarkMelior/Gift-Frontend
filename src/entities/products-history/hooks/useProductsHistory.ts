import {
	getUserAuthData,
	getUserProductsHistory,
	userActions,
} from '@/entities/user';
import { setLocalstorage } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addProductsHistory } from '../api/products-history.api';

export const useProductsHistory = (article: string) => {
	const dispatch = useAppDispatch();
	const [isProductHistory, setIsProductHistory] = useState(false);
	const productsHistory = useSelector(getUserProductsHistory);
	const isUserLogged = useSelector(getUserAuthData);

	useEffect(() => {
		if (productsHistory && productsHistory.includes(article)) {
			setIsProductHistory(true);
		} else {
			setIsProductHistory(false);
		}
	}, [productsHistory, article]);

	const addProductHistory = (e: MouseEvent) => {
		e.preventDefault();

		dispatch(userActions.addProductHistory(article));

		if (isUserLogged) {
			dispatch(addProductsHistory([article]));
		}
	};

	useEffect(() => {
		setLocalstorage(LocalstorageKeys.HISTORY, productsHistory);
	}, [productsHistory]);

	return { isProductHistory, addProductHistory };
};
