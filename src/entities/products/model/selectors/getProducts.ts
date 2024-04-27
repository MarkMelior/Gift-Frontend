import { RootState } from '@/app/store';
import { productsInitialState } from '../slice/products.slice';

export const getProducts = (state: RootState) =>
	state.products ?? productsInitialState;
