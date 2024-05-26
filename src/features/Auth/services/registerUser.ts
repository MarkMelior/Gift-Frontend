import { AuthRegisterRequest } from '@melior-gift/zod-contracts';
import axios from 'axios';

export async function registerUser({
	email,
	password,
	username,
}: AuthRegisterRequest) {
	const response = await axios.post('/api/login', {
		username,
		password,
		email,
	});
	return response.data;
}
