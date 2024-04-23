import { RootState } from '@/app/store';

export const getSettingsCurrency = (state: RootState) =>
	state.settings.currency;
