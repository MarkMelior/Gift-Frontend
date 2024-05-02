import { UserResponse } from '@melior-gift/zod-contracts';

export type Gender = 'male' | 'female';
export type Status = 'online' | 'offline' | 'busy' | 'invisible' | 'away';
export type ConfidentialityParams = 'private' | 'public' | 'friend';

export interface ConfidentialityUser {
	all: ConfidentialityParams;
}

export interface UserState {
	data?: UserResponse;
	isLoading: boolean;
	error?: string;
	access_token?: string;
	readonly: boolean;
}
