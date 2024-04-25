import { AccessToken } from '@/features/auth';
import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData } from '../service/fetch-user-data';
import { User, UserState } from '../types/user';

export const userInitialState: UserState = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined,
	access_token: getLocalstorage<AccessToken>(LocalstorageKeys.USER)
		?.access_token,
};

export const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<string>) => {
			state.access_token = action.payload;
		},
		logout: (state) => {
			state.data = undefined;
			state.access_token = undefined;
			localStorage.removeItem(LocalstorageKeys.USER);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(
				fetchUserData.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.isLoading = false;
					state.data = action.payload;
				},
			)
			.addCase(fetchUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
