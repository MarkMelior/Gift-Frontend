import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User, UserState } from '../types/user';

const authData = getLocalstorage<User>(LocalstorageKeys.USER);

export const userInitialState: UserState = { authData };

export const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload;
		},
		initAuthData: (state) => {
			state.authData = authData;
		},
		logout: (state) => {
			state.authData = undefined;
			localStorage.removeItem(LocalstorageKeys.USER);
		},
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
