import { RootState } from '@/app/store/store';

export const getQuery = (state: RootState) => state.search.query;
