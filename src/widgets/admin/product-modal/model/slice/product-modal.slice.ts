import { ProductCreateRequest } from '@melior-gift/zod-contracts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type ProductModalState = ProductCreateRequest & {
	errors?: DeepPartial<DeepStringify<ProductCreateRequest>>;
};

export const productModalInitialState: ProductModalState = {
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
};

export const productModalSlice = createSlice({
	name: 'productModal',
	initialState: productModalInitialState,
	reducers: {
		clearProductModal: (state) => {
			state = productModalInitialState;
		},
		setErrorsProductModal: (
			state,
			action: PayloadAction<Partial<DeepStringify<ProductModalState>>>,
		) => {
			state.errors = { ...state.errors, ...action.payload };
		},
		updateProductModal: (
			state,
			action: PayloadAction<Partial<ProductModalState>>,
		) => {
			return { ...state, ...action.payload };
		},
		updateMarketsProductModal: (
			state,
			action: PayloadAction<
				Partial<ProductModalState['markets'][0]> & { index: number }
			>,
		) => {
			const { index, ...otherAction } = action.payload;

			state.markets[index] = {
				...state.markets[index],
				...otherAction,
			};
		},
		updateOptionsProductModal: (
			state,
			action: PayloadAction<
				// @ts-ignore
				Partial<ProductModalState['options'][0]> & { index: number }
			>,
		) => {
			const { index, ...otherAction } = action.payload;
			if (!state.options) state.options = [];

			state.options[index] = {
				...state.options[index],
				...otherAction,
			};
		},
	},
});

export const { actions: productModalActions } = productModalSlice;
export const { reducer: productModalReducer } = productModalSlice;
