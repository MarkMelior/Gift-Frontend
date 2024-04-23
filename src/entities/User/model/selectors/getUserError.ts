import { RootState } from '@/app/store';

export const getUserError = (state: RootState) => state.user?.error;
