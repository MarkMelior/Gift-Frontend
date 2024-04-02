import { RootState } from '@/app/providers/StoreProvider';
import { initialState } from '../slice/sortSlice';

export const getSort = (state: RootState) => state.sort ?? initialState;
