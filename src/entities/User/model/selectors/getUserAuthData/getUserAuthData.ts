import { RootState } from '@/app/providers/StoreProvider';

export const getUserAuthData = (state: RootState) => state.user.authData;
