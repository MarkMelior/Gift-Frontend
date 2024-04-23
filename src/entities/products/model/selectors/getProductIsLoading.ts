import { RootState } from '@/app/store';

export const getProductIsLoading = (state: RootState) =>
	state.product?.isLoading;
