import { RootState } from '@/app/providers/StoreProvider';

export const getMinPrice = (state: RootState) => {
	return state.sort.minPrice;
};
