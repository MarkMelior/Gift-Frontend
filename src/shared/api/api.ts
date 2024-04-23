import { AccessToken } from '@/features/Auth';
import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import axios from 'axios';

export const $api = axios.create({
	baseURL: process.env.API,
	headers: {
		Authorization: `Bearer ${
			getLocalstorage<AccessToken>(LocalstorageKeys.USER)?.access_token
		}`,
	},
});
