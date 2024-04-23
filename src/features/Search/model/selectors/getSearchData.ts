import { RootState } from '@/app/store';

export const getSearchData = (state: RootState) => state.search?.data;
