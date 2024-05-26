import { UserResponse } from '@melior-gift/zod-contracts';
import axios from 'axios';

export async function getUser(): Promise<UserResponse> {
	const response = await axios.get('/api/user');
	return response.data;
}
