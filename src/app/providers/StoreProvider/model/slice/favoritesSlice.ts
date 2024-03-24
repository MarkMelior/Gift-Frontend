import { LocalstorageKeys } from '@/shared/types/localstorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

function checkLocalstorage() {
	if (typeof window !== 'undefined') {
		const data = localStorage.getItem(LocalstorageKeys.LIKED);
		if (!data) return [];
		return JSON.parse(data);
	}
	return [];
}

export const initialState: number[] = checkLocalstorage();

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		toggle: (state, action: PayloadAction<number>) => {
			const productID = action.payload;
			const index = state.indexOf(productID);

			if (index === -1) {
				state.push(productID);
			} else {
				state.splice(index, 1);
			}

			localStorage.setItem(LocalstorageKeys.LIKED, JSON.stringify(state));
		},
	},
});

export const { toggle } = favoritesSlice.actions;
