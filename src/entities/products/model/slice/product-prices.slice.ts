import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchProductPrices } from '../services/fetch-product-prices';
import {
	ProductPrices,
	ProductPricesState,
} from '../types/product-prices.type';

export const productPricesInitialState: ProductPricesState = {
	isLoading: false,
	prices: {
		minPrice: 0,
		maxPrice: 50000,
		avgPrice: 25000,
	},
};

export const productPricesSlice = createSlice({
	name: 'product-prices',
	initialState: productPricesInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
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
			});
	},
});

export const { actions: productPricesActions } = productPricesSlice;
export const { reducer: productPricesReducer } = productPricesSlice;
