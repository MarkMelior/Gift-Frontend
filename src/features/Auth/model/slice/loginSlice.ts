import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { loginByUsername } from '../..';
import { LoginState } from '../types/loginState';

export const loginInitialState: LoginState = {
	username: '',
	password: '',
	isLoading: false,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState: loginInitialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginByUsername.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(loginByUsername.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(loginByUsername.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
