import { RootState } from '@/app/providers/StoreProvider';

export const getProductError = (state: RootState) => state.product?.error;
