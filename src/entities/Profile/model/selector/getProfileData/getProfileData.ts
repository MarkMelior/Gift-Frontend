import { RootState } from '@/app/providers/StoreProvider';

export const getProfileData = (state: RootState) => state.profile?.data;
