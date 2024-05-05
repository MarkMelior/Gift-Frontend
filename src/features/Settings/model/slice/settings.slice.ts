import { Currency } from '@/shared/types/localization';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SettingsState } from '../types/settings-state.type';

export const settingsInitialState: SettingsState = {
	space: false,
	optimization: false,
	currency: 'RUB',
	globalIsLoading: true,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState: settingsInitialState,
	reducers: {
		changeCurrency: (state, action: PayloadAction<Currency>) => {
			state.currency = action.payload;
		},
		toggleSpace: (state) => {
			if (state.optimization) {
				state.space = false;
			} else {
				state.space = !state.space;
			}
		},
		toggleOptimization: (state) => {
			if (!state.optimization) {
				state.space = false;
			}
			state.optimization = !state.optimization;
		},
		setGlobalIsLoading: (state, action: PayloadAction<boolean>) => {
			state.globalIsLoading = action.payload;
		},
	},
});

export const { actions: settingsActions } = settingsSlice;
export const { reducer: settingsReducer } = settingsSlice;
