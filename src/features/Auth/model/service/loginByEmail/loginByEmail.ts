import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginByEmailProps {
	email: string;
	password: string;
}

export const loginByEmail = createAsyncThunk<
	User,
	LoginByEmailProps,
	ThunkConfig<string>
>(
	'login/loginByEmail',
	async (authData, { dispatch, extra, rejectWithValue }) => {
		try {
			const response = await extra.api.post<User>('/auth/login', authData);

			if (!response.data) throw new Error();

			localStorage.setItem(
				LocalstorageKeys.USER,
				JSON.stringify(response.data),
			);
			dispatch(userActions.setAuthData(response.data));

			return response.data;
		} catch (e) {
			return rejectWithValue(e.response.data?.message);
		}
	},
);
