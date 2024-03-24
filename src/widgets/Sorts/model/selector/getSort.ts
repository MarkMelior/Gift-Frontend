import { RootState } from '@/app/providers/StoreProvider';

export const getSort = (state: RootState) => {
	return state.sort;
};
