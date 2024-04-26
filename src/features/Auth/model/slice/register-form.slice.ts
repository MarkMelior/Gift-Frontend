import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { userRegister } from '../service/user-register';
import { RegisterState } from '../types/auth.type';

export const registerFormInitialState: RegisterState = {
	email: '',
	username: '',
	password: '',
	isLoading: false,
};

export const registerFormSlice = createSlice({
	name: 'register-form',
	initialState: registerFormInitialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setEmailError: (state, action: PayloadAction<string>) => {
			state.emailError = action.payload;
		},
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setUsernameError: (state, action: PayloadAction<string>) => {
			state.usernameError = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setPasswordError: (state, action: PayloadAction<string>) => {
			state.passwordError = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userRegister.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(userRegister.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(userRegister.rejected, (state, action) => {
				state.isLoading = false;
			});
	},
});

export const { actions: registerFormActions } = registerFormSlice;
export const { reducer: registerFormReducer } = registerFormSlice;
