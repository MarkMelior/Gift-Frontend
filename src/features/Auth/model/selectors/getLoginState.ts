import { RootState } from '@/app/store';

export const getLoginState = (state: RootState) => state?.loginForm;
