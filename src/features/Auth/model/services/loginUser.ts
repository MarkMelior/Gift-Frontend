import { AuthLoginRequest } from '@melior-gift/zod-contracts';
import axios from 'axios';

export async function loginUser({ login, password }: AuthLoginRequest) {
	const response = await axios.post('/api/login', { login, password });
	return response.data;
}
