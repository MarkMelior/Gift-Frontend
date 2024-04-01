import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
	query: string;
}

const initialState: SearchState = {
	query: '',
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload;
		},
	},
});

export const { actions: searchActions } = searchSlice;
export const { reducer: searchReducer } = searchSlice;
