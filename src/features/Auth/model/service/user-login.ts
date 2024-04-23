import { ThunkConfig } from '@/app/store';
import { userActions } from '@/entities/User';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccessToken, LoginProps } from '../types/auth.type';

export const userLogin = createAsyncThunk<
	AccessToken,
	LoginProps,
	ThunkConfig<string>
>('user/login', async (authData, { dispatch, extra, rejectWithValue }) => {
	try {
		const response = await extra.api.post<AccessToken>('/auth/login', authData);

		localStorage.setItem(LocalstorageKeys.USER, JSON.stringify(response.data));

		dispatch(userActions.setAuthData(response.data.access_token));

		return response.data;
	} catch (e: any) {
		return rejectWithValue(e.response.data.message);
	}
});
