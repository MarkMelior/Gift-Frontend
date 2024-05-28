import { useGetProductsQuery } from '@/entities/products';
import { getUserAuthData } from '@/entities/user';
import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { useSelector } from 'react-redux';
import { useGetFavoritesProductsQuery } from '../api/favorites.api';

export const useFavoritesProducts = () => {
	const isUserLogged = useSelector(getUserAuthData);

	let favoritesProducts, isLoading;

	const { data: favoritesData, isLoading: isFavoritesLoading } =
		useGetFavoritesProductsQuery();

	const { data, isLoading: isProductsLoading } = useGetProductsQuery({
		articles: getLocalstorage<string[]>(LocalstorageKeys.LIKED),
	});
	const productsData = data?.products;

	if (isUserLogged) {
		favoritesProducts = favoritesData;
		isLoading = isFavoritesLoading;
	} else {
		favoritesProducts = productsData;
		isLoading = isProductsLoading;
	}

	return { favoritesProducts, isLoading };
};
