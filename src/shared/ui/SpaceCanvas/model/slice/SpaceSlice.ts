'use client';

import { LocalstorageKeys } from '@/shared/const/localstorage';
import { createSlice } from '@reduxjs/toolkit';

export interface SpaceState {
	value: boolean;
}

const initialState: SpaceState = {
	value: false,
};

export const spaceSlice = createSlice({
	name: 'space',
	initialState,
	reducers: {
		enable: (state) => {
			state.value = true;
		},
		disable: (state) => {
			state.value = false;
		},
		toggle: (state) => {
			state.value = !state.value;
			localStorage.setItem(LocalstorageKeys.SPACE, JSON.stringify(state.value));
		},
	},
});

export const { enable, disable, toggle } = spaceSlice.actions;

export default spaceSlice.reducer;
