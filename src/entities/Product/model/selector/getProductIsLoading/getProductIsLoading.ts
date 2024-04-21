import { RootState } from '@/app/providers/StoreProvider';

export const getProductIsLoading = (state: RootState) =>
	state.product?.isLoading;
