import { ThunkConfig } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/user';

export const fetchUserData = createAsyncThunk<User, void, ThunkConfig<string>>(
	'users/fetchUserData',
	async (_, thunkAPI) => {
		try {
			const response = await thunkAPI.extra.api.get<User>('/users');

			// ! test
			if (!response.data) return thunkAPI.rejectWithValue('');

			return response.data;
		} catch (e: any) {
			console.log(e);
			return thunkAPI.rejectWithValue(e.response.data.message);
		}
	},
);
