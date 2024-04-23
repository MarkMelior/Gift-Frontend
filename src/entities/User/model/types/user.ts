import { Country, Currency } from '@/shared/types/localization';

export type Gender = 'male' | 'female';
export type Status = 'online' | 'offline' | 'busy' | 'invisible' | 'away';
export type ConfidentialityParams = 'private' | 'public' | 'friend';

export interface User {
	id: number;
	email: string;
	phone: string;
	first: string;
	last: string;
	age: number;
	currency: Currency;
	country: Country;
	city: string;
	username: string;
	avatar: string;
	sex?: Gender;
	favorites: number[];
	history: number[];
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
	readonly: boolean;
	access_token?: string;
}
