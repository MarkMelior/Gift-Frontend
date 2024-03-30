import { User, userActions } from '@/entities/User';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps>(
	'login/loginByUsername',
	async (authData, thunkAPI) => {
		try {
			const response = await axios.post<User>(
				'http://localhost:8000/login',
				authData,
			);

			if (!response.data) throw new Error();

			localStorage.setItem(
				LocalstorageKeys.USER,
				JSON.stringify(response.data),
			);
			thunkAPI.dispatch(userActions.setAuthData(response.data));

			return response.data;
		} catch (e) {
			console.log(e);
			return thunkAPI.rejectWithValue('Вы ввели неверную почту или пароль');
		}
	},
);
