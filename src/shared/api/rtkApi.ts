import { AccessToken } from '@/features/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getLocalstorage } from '../lib/features';
import { LocalstorageKeys } from '../types/localstorage';

export const rtkApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API,
		prepareHeaders: (headers) => {
			const token = getLocalstorage<AccessToken>(
				LocalstorageKeys.USER,
			)?.access_token;

			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({}),
});
