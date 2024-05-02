import { ThunkConfig } from '@/app/store';
import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { AuthResponse, UserResponse } from '@melior-gift/zod-contracts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataApi } from '../../api/user.api';

export const initAuthData = createAsyncThunk<
	UserResponse | Pick<UserResponse, 'favorites'>,
	void,
	ThunkConfig<string>
>('user/initAuthData', async (_, { rejectWithValue, dispatch }) => {
	const authUser = getLocalstorage<AuthResponse>(
		LocalstorageKeys.USER,
	)?.access_token;

	if (!authUser) {
		const favorites = getLocalstorage<string[]>(LocalstorageKeys.LIKED, []);
		return { favorites };
	}

	try {
		const response = await dispatch(getUserDataApi()).unwrap();
		return response;
	} catch (e) {
		console.log(e);
		return rejectWithValue('');
	}
});
