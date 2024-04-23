import { ConfidentialityParams } from './user';

export interface GameProfile {
	id: number;
	cash: number;
	casinoWin: number;
	casinoLoss: number;
	businessId: number;
	confidentiality?: GameConfidentialityProfile;
}

export interface GameBusiness {
	id: number;
	name: string;
	description: string;
	income: number;
	image: string;
}

export interface GameConfidentialityProfile {
	all: ConfidentialityParams;
}

export interface GameProfileState {
	data?: GameProfile;
	isLoading: boolean;
	error?: string;
}
