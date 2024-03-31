import { RootState } from '@/app/store/store';

export const getLoginState = (state: RootState) => state?.loginForm;
