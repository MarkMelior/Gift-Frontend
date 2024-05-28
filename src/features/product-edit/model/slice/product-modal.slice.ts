import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ProductModalState } from '../types/product-modal';

export const productModalInitialState: ProductModalState = {
	data: {
		creativity: 6,
		title: '',
		description: '',
		markets: [
			{
				market: 'ozon',
				link: '',
				price: 2999,
				rating: 5,
				reviewCount: 245,
				oldPrice: 4999,
			},
		],
	},
};

export const productModalSlice = createSlice({
	name: 'productModal',
	initialState: productModalInitialState,
	reducers: {
		clearProductModal: (state) => {
			state = productModalInitialState;
			return state;
		},
		setErrorsProductModal: (
			state,
			action: PayloadAction<ProductModalState['errors']>,
		) => {
			state.errors = { ...state.errors, ...action.payload };
		},
		updateProductModal: (
			state,
			action: PayloadAction<Partial<ProductModalState['data']>>,
		) => {
			state.data = { ...state.data, ...action.payload };
		},
		updateMarketsProductModal: (
			state,
			action: PayloadAction<
				Partial<ProductModalState['data']['markets'][0]> & { index: number }
			>,
		) => {
			const { index, ...otherAction } = action.payload;

			state.data.markets[index] = {
				...state.data.markets[index],
				...otherAction,
			};
		},
		updateOptionsProductModal: (
			state,
			action: PayloadAction<
				// @ts-ignore
				Partial<ProductModalState['data']['options'][0]> & { index: number }
			>,
		) => {
			const { index, ...otherAction } = action.payload;
			if (!state.data.options) state.data.options = [];

			state.data.options[index] = {
				...state.data.options[index],
				...otherAction,
			};
		},
	},
});

export const { actions: productModalActions } = productModalSlice;
export const { reducer: productModalReducer } = productModalSlice;
