import { ThunkConfig } from '@/app/store';
import { AccessToken } from '@/features/auth';
import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataApi } from '../../api/user.api';
import { User } from '../types/user';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
	'user/initAuthData',
	async (_, { rejectWithValue, dispatch }) => {
		const authUser = getLocalstorage<AccessToken>(
			LocalstorageKeys.USER,
		)?.access_token;

		if (!authUser) {
			return rejectWithValue('');
		}

		try {
			const response = await dispatch(getUserDataApi()).unwrap();
			return response;
		} catch (e) {
			console.log(e);
			return rejectWithValue('');
		}
	},
);
