import { Country, Currency } from '@/shared/types/localization';

export type Gender = 'male' | 'female';
export type Status = 'online' | 'offline' | 'busy' | 'invisible' | 'away';
export type ConfidentialityParams = 'private' | 'public' | 'friend';

export interface Profile {
	id: number;
	private: boolean;
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
	sex: Gender;
	status: Status;
	favorites: number[];
	history: number[];
	confidentiality?: ConfidentialityProfile;
	gameId?: number;
}

export interface ConfidentialityProfile {
	all: ConfidentialityParams;
}

export interface ProfileState {
	data?: Profile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
}
