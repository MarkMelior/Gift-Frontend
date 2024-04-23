import { RootState } from '@/app/store';

export const getQuery = (state: RootState) => state.search?.query;
