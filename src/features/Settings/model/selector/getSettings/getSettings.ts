import { RootState } from '@/app/providers/StoreProvider';

export const getSettings = (state: RootState) => state.settings;
