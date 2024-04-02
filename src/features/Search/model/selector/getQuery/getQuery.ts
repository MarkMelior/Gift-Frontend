import { RootState } from '@/app/providers/StoreProvider';
import { searchInitialState } from '../../slice/searchSlice';

export const getQuery = (state: RootState) =>
	state.search?.query ?? searchInitialState.query;
