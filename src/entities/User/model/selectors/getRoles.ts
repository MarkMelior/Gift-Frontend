import { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../types/user';

export const getUserRoles = (state: RootState) => state.user.data?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
	Boolean(roles?.includes(UserRole.ADMIN)),
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
	Boolean(roles?.includes(UserRole.MANAGER)),
);
