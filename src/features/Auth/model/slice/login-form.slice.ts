import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../service/user-login';
import { LoginState } from '../types/auth.type';

export const loginFormInitialState: LoginState = {
	login: '',
	password: '',
	remember: true,
	isLoading: false,
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
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(userLogin.rejected, (state, action) => {
				state.isLoading = false;
			});
	},
});

export const { actions: loginFormActions } = loginFormSlice;
export const { reducer: loginFormReducer } = loginFormSlice;
