import { Currency } from '@/shared/types/localization';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SettingsState } from '../..';

export const settingsInitialState: SettingsState = {
	space: false,
	optimization: false,
	currency: 'RUB',
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState: settingsInitialState,
	reducers: {
		changeCurrency: (state, action: PayloadAction<Currency>) => {
			state.currency = action.payload;
		},
		toggleSpace: (state) => {
			state.space = !state.space;
		},
		toggleOptimization: (state) => {
			state.optimization = !state.optimization;
		},
	},
});

export const { actions: settingsActions } = settingsSlice;
export const { reducer: settingsReducer } = settingsSlice;
