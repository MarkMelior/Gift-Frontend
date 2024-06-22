import { getUserDataApi, useFindUsersQuery, userApi } from './api/user.api';
import { useRoleAccess } from './hooks/useRoleAccess';
import { getUserAuthData } from './model/selectors/getUserAuthData';
import { getUserData } from './model/selectors/getUserData';
import { getUserFavorites } from './model/selectors/getUserFavorites';
import { getUserProductsHistory } from './model/selectors/getUserProductsHistory';
import { getUserState } from './model/selectors/getUserState';
import { initAuthData } from './model/services/initAuthData';
import {
	useUserActions,
	userActions,
	userReducer,
} from './model/slice/user.slice';
import { ConfidentialityUser, UserState } from './model/types/user';
import {
	GameBusiness,
	GameConfidentialityProfile,
	GameProfile,
	GameProfileState,
} from './model/types/user-game';

export {
	getUserAuthData,
	getUserData,
	getUserDataApi,
	getUserFavorites,
	getUserProductsHistory,
	getUserState,
	initAuthData,
	useFindUsersQuery,
	useRoleAccess,
	useUserActions,
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
	UserState,
};
