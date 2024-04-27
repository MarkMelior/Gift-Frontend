import { isUserAdmin, isUserManager } from './model/selectors/getRoles';
import { getUserAuthData } from './model/selectors/getUserAuthData';
import { getUserData } from './model/selectors/getUserData';
import { getUserError } from './model/selectors/getUserError';
import { getUserIsLoading } from './model/selectors/getUserIsLoading';
import { fetchUserData } from './model/service/fetch-user-data';
import { userActions, userReducer } from './model/slice/user.slice';
import {
	ConfidentialityUser,
	User,
	UserRole,
	UserState,
} from './model/types/user';
import {
	GameBusiness,
	GameConfidentialityProfile,
	GameProfile,
	GameProfileState,
} from './model/types/user-game';

export {
	UserRole,
	fetchUserData,
	getUserAuthData,
	getUserData,
	getUserError,
	getUserIsLoading,
	isUserAdmin,
	isUserManager,
	userActions,
	userReducer,
};

export type {
	ConfidentialityUser,
	GameBusiness,
	GameConfidentialityProfile,
	GameProfile,
	GameProfileState,
	User,
	UserState,
};
