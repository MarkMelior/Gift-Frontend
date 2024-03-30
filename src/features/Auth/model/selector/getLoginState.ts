import { RootState } from '@/app/providers/StoreProvider';

export const getLoginState = (state: RootState) => state?.loginForm;
