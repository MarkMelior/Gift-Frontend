import { rtkApi } from '@/shared/api/rtkApi';
import { UserFindRequest, UserResponse } from '@melior-gift/zod-contracts';

export const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getUserData: build.query<UserResponse, void>({
			query: () => ({
				url: `/users`,
				method: 'GET',
			}),
		}),
		findUsers: build.query<UserResponse[], UserFindRequest>({
			query: (dto) => ({
				url: `/users/find`,
				method: 'GET',
				params: dto,
			}),
		}),
	}),
});

export const getUserDataApi = userApi.endpoints.getUserData.initiate;

export const { useFindUsersQuery } = userApi;
