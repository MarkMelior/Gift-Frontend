import { RootState } from '@/app/store';
import { productInitialState } from '../slice/product.slice';

export const getProduct = (state: RootState) =>
	state.product ?? productInitialState;
