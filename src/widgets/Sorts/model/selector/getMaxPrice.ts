import { RootState } from '@/app/providers/StoreProvider';

export const getMaxPrice = (state: RootState) => {
	return state.sort.maxPrice;
};
