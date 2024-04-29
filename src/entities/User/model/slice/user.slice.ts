import { LocalstorageKeys } from '@/shared/types/localstorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { initAuthData } from '../services/initAuthData';
import { User, UserState } from '../types/user';

export const userInitialState: Omit<UserState, 'data'> & {
	data: Partial<User>;
} = {
	readonly: true,
	isLoading: false,
	data: { favorites: [] },
};

export const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<string>) => {
			state.access_token = action.payload;
		},
		logout: (state) => {
			state.access_token = undefined;
			localStorage.removeItem(LocalstorageKeys.USER);
		},
		toggleFavorites: (state, action: PayloadAction<string>) => {
			if (state.data && state.data.favorites) {
				state.data.favorites = state.data.favorites.includes(action.payload)
					? state.data.favorites.filter((item) => item !== action.payload)
					: [...state.data.favorites, action.payload];
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(initAuthData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(initAuthData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
