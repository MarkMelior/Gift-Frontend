import { RootState } from '@/app/store';
import { productInitialState } from '../slice/product.slice';

export const getProductPrices = (state: RootState) =>
	state.product?.prices ?? productInitialState.prices;
