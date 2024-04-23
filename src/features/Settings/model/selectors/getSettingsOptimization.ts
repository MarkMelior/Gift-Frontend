import { RootState } from '@/app/store';

export const getSettingsOptimization = (state: RootState) =>
	state.settings.optimization;
