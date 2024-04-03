import { getProfileData } from './model/selector/getProfileData/getProfileData';
import { getProfileError } from './model/selector/getProfileError/getProfileError';
import { getProfileIsLoading } from './model/selector/getProfileIsLoading/getProfileIsLoading';
import { fetchProfileData } from './model/service/fetchProfileData/fetchProfileData';
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

export {
	fetchProfileData,
	getProfileData,
	getProfileError,
	getProfileIsLoading,
	profileActions,
	profileReducer,
};

export type {
	ConfidentialityProfile,
	GameBusiness,
	GameConfidentialityProfile,
	GameProfile,
	GameProfileState,
	Profile,
	ProfileState,
};
