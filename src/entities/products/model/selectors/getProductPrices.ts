import { RootState } from '@/app/store';
import { productPricesInitialState } from '../slice/product-prices.slice';

export const getProductPrices = (state: RootState) =>
	state.productPrices ?? productPricesInitialState;
