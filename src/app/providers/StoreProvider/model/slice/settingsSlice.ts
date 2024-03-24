import { Currency } from '@/shared/types/localization';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SettingsState, SettingsStateKey } from '../..';

function checkLocalStorage<T = boolean>(
	action: SettingsStateKey,
	defaultValue: T,
) {
	if (typeof window !== 'undefined') {
		const data = localStorage.getItem(LocalstorageKeys.SETTINGS);
		if (!data) return defaultValue;
		const value: SettingsState = JSON.parse(data);
		return value[action] as T;
	}
	return defaultValue;
}

export const initialState: SettingsState = {
	space: checkLocalStorage('space', false),
	animations: checkLocalStorage('animations', true),
	effects: checkLocalStorage('effects', true),
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

export const { toggle } = settingsSlice.actions;
