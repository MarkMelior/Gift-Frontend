import { RootState } from '@/app/providers/StoreProvider';

export const getSettingsOptimization = (state: RootState) =>
	state.settings.optimization;
