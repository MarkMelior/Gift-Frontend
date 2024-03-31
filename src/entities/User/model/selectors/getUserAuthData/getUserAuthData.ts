import { RootState } from '@/app/store/store';

export const getUserAuthData = (state: RootState) => state.user.authData;
