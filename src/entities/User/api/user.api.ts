import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';

export const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getUserData: build.query<User, void>({
			query: () => ({
				url: `/users`,
				method: 'GET',
			}),
		}),
	}),
});

export const getUserDataApi = userApi.endpoints.getUserData.initiate;
