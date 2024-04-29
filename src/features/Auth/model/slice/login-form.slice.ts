import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { LoginState } from '../types/auth.type';

export const loginFormInitialState: LoginState = {
	login: '',
	password: '',
	remember: true,
};

export const loginFormSlice = createSlice({
	name: 'login-form',
	initialState: loginFormInitialState,
	reducers: {
		setLogin: (state, action: PayloadAction<string>) => {
			state.login = action.payload;
		},
		setLoginError: (state, action: PayloadAction<string>) => {
			state.loginError = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setPasswordError: (state, action: PayloadAction<string>) => {
			state.passwordError = action.payload;
		},
		setRemember: (state, action: PayloadAction<boolean>) => {
			state.remember = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { actions: loginFormActions } = loginFormSlice;
export const { reducer: loginFormReducer } = loginFormSlice;
