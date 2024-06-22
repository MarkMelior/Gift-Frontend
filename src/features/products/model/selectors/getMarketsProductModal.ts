import { RootState } from '@/app/store';

export const getMarketsProductModal = (state: RootState) =>
	state.productModal?.data.markets;
