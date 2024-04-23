import { RootState } from '@/app/store';

export const getUserIsLoading = (state: RootState) => state.user?.isLoading;
