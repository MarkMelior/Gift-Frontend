import { RootState } from '@/app/store';

export const getUserFavorites = (state: RootState) =>
	state.user.data?.favorites;
