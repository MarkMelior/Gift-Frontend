import { RootState } from '@/app/store/store';

export const getSettingsCurrency = (state: RootState) =>
	state.settings.currency;
