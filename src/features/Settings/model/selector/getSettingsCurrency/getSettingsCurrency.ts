import { RootState } from '@/app/providers/StoreProvider';

export const getSettingsCurrency = (state: RootState) =>
	state.settings.currency;
