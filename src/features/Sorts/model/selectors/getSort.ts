import { RootState } from '@/app/store';
import { initialState } from '../slice/sort.slice';

export const getSort = (state: RootState) => state.sort ?? initialState;
