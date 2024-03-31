import { RootState } from '@/app/store/store';

export const getSettingsOptimization = (state: RootState) =>
	state.settings.optimization;
