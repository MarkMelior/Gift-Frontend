import axios from 'axios';
import { getLocalstorage } from '../lib/features';
import { LocalstorageKeys } from '../types/localstorage';

export const $api = axios.create({
	baseURL: process.env.API,
	headers: {
		authorization: getLocalstorage(LocalstorageKeys.USER),
	},
});
