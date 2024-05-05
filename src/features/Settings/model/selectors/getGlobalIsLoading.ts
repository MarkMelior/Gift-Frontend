import { RootState } from '@/app/store';

export const getGlobalIsLoading = (state: RootState) =>
	state.settings.globalIsLoading;
