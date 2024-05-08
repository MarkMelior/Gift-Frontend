import { RootState } from '@/app/store';

export const getUserProductsHistory = (state: RootState) =>
	state.user.data?.history;
