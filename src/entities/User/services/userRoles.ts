import { UserResponse } from '@melior-gift/zod-contracts';
import axios from 'axios';

interface UserRoles {
	isAdmin: boolean;
	isManager: boolean;
}

export async function userRoles(): Promise<UserRoles> {
	const response = await axios.get('/api/user');

	const user = response.data as UserResponse;

	return {
		isAdmin: !!user.roles && user.roles.includes('admin'),
		isManager: !!user.roles && user.roles.includes('manager'),
	};
}
