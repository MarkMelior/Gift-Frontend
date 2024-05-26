import { getUserDataApi, useFindUsersQuery, userApi } from './api/user.api';
import { getUserAuthData } from './model/selectors/getUserAuthData';
import { getUserData } from './model/selectors/getUserData';
import { getUserFavorites } from './model/selectors/getUserFavorites';
import { getUserState } from './model/selectors/getUserState';
import { initAuthData } from './model/services/initAuthData';
import { userActions, userReducer } from './model/slice/user.slice';
import { ConfidentialityUser, UserState } from './model/types/user';
import {
	GameBusiness,
	GameConfidentialityProfile,
	GameProfile,
	GameProfileState,
} from './model/types/user-game';
import { getUser } from './services/getUser';
import { userRoles } from './services/userRoles';

export {
	getUser,
	getUserAuthData,
	getUserData,
	getUserDataApi,
	getUserFavorites,
	getUserState,
	initAuthData,
	useFindUsersQuery,
	userActions,
	userApi,
	userReducer,
	userRoles,
};

export type {
	ConfidentialityUser,
	GameBusiness,
	GameConfidentialityProfile,
	GameProfile,
	GameProfileState,
	UserState,
};
