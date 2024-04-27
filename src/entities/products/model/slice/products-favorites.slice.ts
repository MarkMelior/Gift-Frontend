import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoritesProducts } from '../services/fetch-favorites-products';
import { ProductCard } from '../types/product.type';
import { ProductsState } from '../types/products.type';

export const productsFavoritesInitialState: ProductsState = {
	isLoading: false,
};

export const productsFavoritesSlice = createSlice({
	name: 'products-favorites',
	initialState: productsFavoritesInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavoritesProducts.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchFavoritesProducts.fulfilled,
				(state, action: PayloadAction<ProductCard[]>) => {
					state.isLoading = false;
					state.data = action.payload;
				},
			)
			.addCase(fetchFavoritesProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: productsFavoritesActions } = productsFavoritesSlice;
export const { reducer: productsFavoritesReducer } = productsFavoritesSlice;
