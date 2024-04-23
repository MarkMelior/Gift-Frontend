import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../service/user-login';
import { LoginState } from '../types/auth.type';

export const loginInitialState: LoginState = {
	login: '',
	password: '',
	isLoading: false,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState: loginInitialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.login = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
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
				state.error = action.payload;
			});
	},
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
