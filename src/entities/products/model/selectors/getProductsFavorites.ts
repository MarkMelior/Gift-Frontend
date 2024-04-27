import { RootState } from '@/app/store';
import { productsFavoritesInitialState } from '../slice/products-favorites.slice';

export const getProductsFavorites = (state: RootState) =>
	state.productsFavorites ?? productsFavoritesInitialState;
