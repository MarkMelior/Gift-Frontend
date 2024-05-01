import { ThunkConfig } from '@/app/store';
import { AccessToken } from '@/features/auth';
import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataApi } from '../../api/user.api';
import { User } from '../types/user';

export interface NotUserLogin {
	favorites: string[] | undefined;
}

export const initAuthData = createAsyncThunk<
	User | NotUserLogin,
	void,
	ThunkConfig<string>
>('user/initAuthData', async (_, { rejectWithValue, dispatch }) => {
	const authUser = getLocalstorage<AccessToken>(
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
