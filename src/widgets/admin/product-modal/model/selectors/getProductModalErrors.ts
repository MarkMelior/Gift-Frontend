import { RootState } from '@/app/store';

export const getProductModalErrors = (state: RootState) =>
	state.productModal?.errors;
