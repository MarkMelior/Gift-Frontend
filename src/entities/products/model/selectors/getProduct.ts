import { RootState } from '@/app/store';

export const getProduct = (state: RootState) => state.product?.product;
