import { Product } from '@/entities/products';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { searchProduct } from '../service/search-product';
import { SearchState } from '../types/search-state.type';

export const searchInitialState: SearchState = {
	query: '',
	data: [],
	isLoading: false,
};

export const searchSlice = createSlice({
	name: 'search',
	initialState: searchInitialState,
	reducers: {
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchProduct.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				searchProduct.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.isLoading = false;
					state.data = action.payload;
				},
			)
			.addCase(searchProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: searchActions } = searchSlice;
export const { reducer: searchReducer } = searchSlice;
