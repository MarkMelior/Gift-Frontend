import { Currency } from '@/shared/types/localization';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SettingsState, SettingsStateKey } from '../..';

function checkLocalStorage<T = boolean>(
	action: SettingsStateKey,
	defaultValue: T,
): T {
	if (typeof window !== 'undefined') {
		const storedSettings = localStorage.getItem(LocalstorageKeys.SETTINGS);
		if (!storedSettings) return defaultValue;
		const parsedSettings: SettingsState = JSON.parse(storedSettings);
		return parsedSettings[action] as T;
	}
	return defaultValue;
}

export const initialState: SettingsState = {
	space: checkLocalStorage('space', false),
	optimization: checkLocalStorage('optimization', false),
	currency: checkLocalStorage<Currency>('currency', 'RUB'),
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		toggle: (
			state,
			action: PayloadAction<Exclude<SettingsStateKey, 'currency'>>,
		) => {
			state[action.payload] = !state[action.payload];
			localStorage.setItem(LocalstorageKeys.SETTINGS, JSON.stringify(state));
		},
		changeCurrency: (state, action: PayloadAction<Currency>) => {
			state.currency = action.payload;
			localStorage.setItem(LocalstorageKeys.SETTINGS, JSON.stringify(state));
		},
	},
});

export const { actions: settingsActions } = settingsSlice;
export const { reducer: settingsReducer } = settingsSlice;
