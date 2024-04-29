import { getUserDataApi, userApi } from './api/user.api';
import { isUserAdmin, isUserManager } from './model/selectors/getRoles';
import { getUserAuthData } from './model/selectors/getUserAuthData';
import { getUserData } from './model/selectors/getUserData';
import { getUserState } from './model/selectors/getUserState';
import { initAuthData } from './model/services/initAuthData';
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
	getUserAuthData,
	getUserData,
	getUserDataApi,
	getUserState,
	initAuthData,
	isUserAdmin,
	isUserManager,
	userActions,
	userApi,
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
