import { RootState } from '@/app/providers/StoreProvider';

export const getSettingsSpace = (state: RootState) => state.settings.space;
