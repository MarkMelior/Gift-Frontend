import { RootState } from '@/app/providers/StoreProvider';

export const getProfileError = (state: RootState) => state.profile?.error;
