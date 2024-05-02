import { rtkApi } from '@/shared/api/rtkApi';
import { UserResponse } from '@melior-gift/zod-contracts';

export const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getUserData: build.query<UserResponse, void>({
			query: () => ({
				url: `/users`,
				method: 'GET',
			}),
		}),
	}),
});

export const getUserDataApi = userApi.endpoints.getUserData.initiate;
