import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<
	User,
	LoginByUsernameProps,
	ThunkConfig<string>
>(
	'login/loginByUsername',
	async (authData, { dispatch, extra, rejectWithValue }) => {
		try {
			const response = await extra.api.post<User>('/login', authData);

			if (!response.data) throw new Error();

			localStorage.setItem(
				LocalstorageKeys.USER,
				JSON.stringify(response.data),
			);
			dispatch(userActions.setAuthData(response.data));

			return response.data;
		} catch (e) {
			console.log(e);
			return rejectWithValue('Вы ввели неверную почту или пароль');
		}
	},
);
