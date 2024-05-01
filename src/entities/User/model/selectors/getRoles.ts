import { RootState } from '@/app/store';

export const getUserRoles = (state: RootState) => state.user.data?.roles;
