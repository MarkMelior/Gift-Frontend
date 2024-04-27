import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetch-products';
import { Product } from '../types/product.type';
import { ProductsState } from '../types/products.type';

export const productsInitialState: ProductsState = {
	isLoading: false,
};

export const productsSlice = createSlice({
	name: 'products',
	initialState: productsInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.isLoading = false;
					state.data = action.payload;
				},
			)
			.addCase(fetchProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: productsActions } = productsSlice;
export const { reducer: productsReducer } = productsSlice;
