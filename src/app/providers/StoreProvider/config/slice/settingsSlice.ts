'use client';

import { LocalstorageKeys } from '@/shared/const/localstorage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
	space: boolean;
	animations: boolean;
	effects: boolean;
}

export type SettingsStateKey = keyof SettingsState;

export const initialState: SettingsState = {
	space: false,
	animations: true,
	effects: true,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		toggle: (state, action: PayloadAction<SettingsStateKey>) => {
			state[action.payload] = !state[action.payload];
			localStorage.setItem(LocalstorageKeys.SETTINGS, JSON.stringify(state));
		},
		// toggleSpace: (state) => {
		// 	state.space = !state.space;
		// 	localStorage.setItem(LocalstorageKeys.SPACE, JSON.stringify(state.space));
		// },
		// toggleEffect: (state) => {
		// 	state.effects = !state.effects;
		// 	localStorage.setItem(
		// 		LocalstorageKeys.EFFECTS,
		// 		JSON.stringify(state.effects),
		// 	);
		// },
		// toggleAnimation: (state) => {
		// 	state.animations = !state.animations;
		// 	localStorage.setItem(
		// 		LocalstorageKeys.ANIMATIONS,
		// 		JSON.stringify(state.animations),
		// 	);
		// },
	},
});

export const { toggle } = settingsSlice.actions;
