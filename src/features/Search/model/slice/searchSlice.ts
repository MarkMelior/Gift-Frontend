import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SearchState } from '../types/SearchState';

export const searchInitialState: SearchState = {
	query: '',
};

export const searchSlice = createSlice({
	name: 'search',
	initialState: searchInitialState,
	reducers: {
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload;
		},
	},
});

export const { actions: searchActions } = searchSlice;
export const { reducer: searchReducer } = searchSlice;
