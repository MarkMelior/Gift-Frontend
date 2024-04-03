import axios from 'axios';
import { LocalstorageKeys } from '../types/localstorage';

export const $api = axios.create({
	baseURL: process.env.API,
	headers: {
		authorization: localStorage.getItem(LocalstorageKeys.USER) || '',
	},
});
