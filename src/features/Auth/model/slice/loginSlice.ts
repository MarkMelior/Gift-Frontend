import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { loginByEmail } from '../service/loginByEmail/loginByEmail';
import { LoginState } from '../types/loginState';

export const loginInitialState: LoginState = {
	email: '',
	password: '',
	isLoading: false,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState: loginInitialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginByEmail.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(loginByEmail.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(loginByEmail.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
