import { RootState } from '@/app/store';

export const getProductError = (state: RootState) => state.product?.error;
