import { RootState } from '@/app/store';

export const getProductModal = (state: RootState) => state.productModal?.data;
