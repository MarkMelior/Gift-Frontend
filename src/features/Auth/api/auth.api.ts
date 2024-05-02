import { userActions, userApi } from '@/entities/user';
import { rtkApi } from '@/shared/api/rtkApi';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import {
	AuthLoginRequest,
	AuthRegisterRequest,
	AuthResponse,
} from '@melior-gift/zod-contracts';

const authApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		loginUser: build.mutation<AuthResponse, AuthLoginRequest>({
			query: (authData) => ({
				url: `/auth/login`,
				method: 'POST',
				body: authData,
			}),
			onQueryStarted: (authData, { dispatch, queryFulfilled }) => {
				queryFulfilled.then((response) => {
					localStorage.setItem(
						LocalstorageKeys.USER,
						JSON.stringify(response.data),
					);
					dispatch(userActions.setAuthData(response.data.access_token));
					dispatch(userApi.util.resetApiState());
				});
			},
		}),
		registerUser: build.mutation<AuthResponse, AuthRegisterRequest>({
			query: (authData) => ({
				url: `/auth/register`,
				method: 'POST',
				body: authData,
			}),
			onQueryStarted: (authData, { dispatch, queryFulfilled }) => {
				queryFulfilled.then((response) => {
					localStorage.setItem(
						LocalstorageKeys.USER,
						JSON.stringify(response.data),
					);
					dispatch(userActions.setAuthData(response.data.access_token));
					dispatch(userApi.util.resetApiState());
				});
			},
		}),
	}),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
