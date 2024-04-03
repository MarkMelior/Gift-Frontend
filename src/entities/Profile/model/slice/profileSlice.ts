import { createSlice } from '@reduxjs/toolkit';
import { ProfileState } from '../types/profile';

export const profileInitialState: ProfileState = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState: profileInitialState,
	reducers: {},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
