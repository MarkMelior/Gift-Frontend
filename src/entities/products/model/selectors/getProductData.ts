import { RootState } from '@/app/store';

export const getProductData = (state: RootState) => state.product?.data;
