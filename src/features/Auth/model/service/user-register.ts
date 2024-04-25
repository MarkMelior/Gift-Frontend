import { ThunkConfig } from '@/app/store';
import { userActions } from '@/entities/User';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccessToken, RegisterProps } from '../types/auth.type';

export const userRegister = createAsyncThunk<
	AccessToken,
	RegisterProps,
	ThunkConfig<string>
>('user/register', async (authData, { dispatch, extra, rejectWithValue }) => {
	try {
		const response = await extra.api.post<AccessToken>(
			'/auth/register',
			authData,
		);

		localStorage.setItem(LocalstorageKeys.USER, JSON.stringify(response.data));

		dispatch(userActions.setAuthData(response.data.access_token));

		return response.data;
	} catch (e: any) {
		return rejectWithValue(e.response.data.message);
	}
});
