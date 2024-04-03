import { RootState } from '@/app/providers/StoreProvider';

export const getProfileIsLoading = (state: RootState) =>
	state.profile?.isLoading;
