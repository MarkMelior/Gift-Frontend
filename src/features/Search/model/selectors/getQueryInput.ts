import { RootState } from '@/app/store';
import { searchInitialState } from '../slice/search.slice';

export const getQueryInput = (state: RootState) =>
	state.search?.queryInput ?? searchInitialState.queryInput;
