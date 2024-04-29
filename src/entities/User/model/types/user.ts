export type Gender = 'male' | 'female';
export type Status = 'online' | 'offline' | 'busy' | 'invisible' | 'away';
export type ConfidentialityParams = 'private' | 'public' | 'friend';

export enum UserRole {
	ADMIN = 'admin',
	MANAGER = 'manager',
}

export interface User {
	_id: number;
	username: string;
	email: string;
	roles?: UserRole[];
	first?: string;
	last?: string;
	age?: number;
	avatar?: string;
	sex?: Gender;
	favorites?: string[];
	history?: number[];
	confidentiality?: ConfidentialityUser;
	gameId?: number;
}

export interface ConfidentialityUser {
	all: ConfidentialityParams;
}

export interface UserState {
	data?: User;
	isLoading: boolean;
	error?: string;
	access_token?: string;
	readonly: boolean;

	// _inited: boolean;
}
