import { RootState } from '@/app/store';

export const getUserAuthData = (state: RootState) => state.user.access_token;
