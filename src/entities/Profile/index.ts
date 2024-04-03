import { profileActions, profileReducer } from './model/slice/profileSlice';
import {
	ConfidentialityProfile,
	Profile,
	ProfileState,
} from './model/types/profile';
import {
	GameBusiness,
	GameConfidentialityProfile,
	GameProfile,
	GameProfileState,
} from './model/types/profileGame';

export { profileActions, profileReducer };

export type {
	ConfidentialityProfile,
	GameBusiness,
	GameConfidentialityProfile,
	GameProfile,
	GameProfileState,
	Profile,
	ProfileState,
};
