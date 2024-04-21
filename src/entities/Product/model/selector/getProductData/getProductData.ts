import { RootState } from '@/app/providers/StoreProvider';

export const getProductData = (state: RootState) => state.product?.data;
