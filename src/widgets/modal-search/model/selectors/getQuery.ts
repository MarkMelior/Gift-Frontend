import { RootState } from '@/app/store';
import { searchInitialState } from '../slice/search.slice';

export const getQuery = (state: RootState) =>
	state.search?.query ?? searchInitialState.query;
