import { AccessToken } from '@/features/auth';
import axios from 'axios';
import { getLocalstorage } from '../lib/features';
import { LocalstorageKeys } from '../types/localstorage';

export const $api = axios.create({
	baseURL: process.env.API,
});

$api.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers.Authorization = `Bearer ${
			getLocalstorage<AccessToken>(LocalstorageKeys.USER)?.access_token
		}`;
	}
	return config;
});
