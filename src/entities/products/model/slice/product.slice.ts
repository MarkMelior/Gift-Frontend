import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchProductByArticle } from '../services/fetch-product-by-article';
import { Product, ProductState } from '../types/product.type';

export const productInitialState: ProductState = {
	isLoading: false,
};

export const productSlice = createSlice({
	name: 'product',
	initialState: productInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductByArticle.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchProductByArticle.fulfilled,
				(state, action: PayloadAction<Product>) => {
					state.isLoading = false;
					state.product = action.payload;
				},
			)
			.addCase(fetchProductByArticle.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: productActions } = productSlice;
export const { reducer: productReducer } = productSlice;
