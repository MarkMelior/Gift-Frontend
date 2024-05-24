import { ThunkConfig } from '@/app/store';
import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { AuthResponse } from '@melior-gift/zod-contracts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataApi } from '../../api/user.api';
import { UserState } from '../types/user';

export const initAuthData = createAsyncThunk<
	UserState['data'],
	void,
	ThunkConfig<string>
>('user/initAuthData', async (_, { rejectWithValue, dispatch }) => {
	const authUser = getLocalstorage<AuthResponse>(
		LocalstorageKeys.USER,
	)?.access_token;

	if (!authUser) {
		const favorites = getLocalstorage<string[]>(LocalstorageKeys.LIKED, []);
		const history = getLocalstorage<string[]>(LocalstorageKeys.HISTORY, []);
		return { favorites, history };
	}

	try {
		const response = await dispatch(getUserDataApi()).unwrap();
		return response;
	} catch (e) {
		console.log(e);
		return rejectWithValue('');
	}
});
