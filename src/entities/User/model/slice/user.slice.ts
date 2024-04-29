import { LocalstorageKeys } from '@/shared/types/localstorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { initAuthData } from '../services/initAuthData';
import { User, UserState } from '../types/user';

export const userInitialState: UserState = {
	readonly: true,
	isLoading: false,
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
