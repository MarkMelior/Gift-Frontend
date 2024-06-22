import { buildSlice } from '@/shared/lib/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from '../types/search-state.type';

export const searchInitialState: SearchState = {
	query: '',
	queryInput: '',
};

export const searchSlice = buildSlice({
	name: 'search',
	initialState: searchInitialState,
	reducers: {
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload;
		},
		setQueryInput: (state, action: PayloadAction<string>) => {
			state.queryInput = action.payload;
		},
	},
});

export const {
	actions: searchActions,
	reducer: searchReducer,
	useActions: useSearchActions,
} = searchSlice;
