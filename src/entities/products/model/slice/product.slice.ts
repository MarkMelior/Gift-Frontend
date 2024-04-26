import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchProductById } from '../services/fetch-product-by-id';
import { fetchProductData } from '../services/fetch-product-data';
import { fetchProductPrices } from '../services/fetch-product-prices';
import { Product, ProductPrices, ProductState } from '../types/product.type';

export const productInitialState: ProductState = {
	readonly: true,
	isLoading: false,
	prices: {
		minPrice: 0,
		maxPrice: 50000,
		avgPrice: 25000,
	},
};

export const productSlice = createSlice({
	name: 'product',
	initialState: productInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// * fetch product data
			.addCase(fetchProductData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchProductData.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					state.isLoading = false;
					state.data = action.payload;
				},
			)
			.addCase(fetchProductData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// * fetch product prices
			.addCase(fetchProductPrices.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchProductPrices.fulfilled,
				(state, action: PayloadAction<ProductPrices>) => {
					state.isLoading = false;
					state.prices = action.payload;
				},
			)
			.addCase(fetchProductPrices.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// * fetch product by id
			.addCase(fetchProductById.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchProductById.fulfilled,
				(state, action: PayloadAction<Product>) => {
					state.isLoading = false;
					state.product = action.payload;
				},
			)
			.addCase(fetchProductById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: productActions } = productSlice;
export const { reducer: productReducer } = productSlice;
