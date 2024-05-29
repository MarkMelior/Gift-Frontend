import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RegisterState } from '../types/auth.type';

export const registerFormInitialState: RegisterState = {
	email: '',
	username: '',
	password: '',
};

export const registerFormSlice = createSlice({
	name: 'register-form',
	initialState: registerFormInitialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setError: (state, action: PayloadAction<RegisterState['error']>) => {
			state.error = action.payload;
		},
	},
});

export const { actions: registerFormActions } = registerFormSlice;
export const { reducer: registerFormReducer } = registerFormSlice;
