import { LocalstorageKeys } from '@/shared/types/localstorage';
import { RootState } from '../types/storeSchema';

type GetFavoritesConfigure = 'all';

export const getFavorites =
	(value?: number | GetFavoritesConfigure) => (state?: RootState) => {
		if (typeof window !== 'undefined') {
			const data = localStorage.getItem(LocalstorageKeys.LIKED);

			if (data && typeof value === 'number') {
				const favorites: number[] = JSON.parse(data);
				const index = favorites.indexOf(value);
				return index !== -1;
			}

			if (data && value === 'all') {
				return JSON.parse(data);
			}

			return false;
		}

		return state?.favorites;

		// if (typeof window !== 'undefined') {
		// 	const data = localStorage.getItem(LocalstorageKeys.LIKED);

		// 	if (!data) return null;

		// 	return JSON.parse(data);
		// }

		// return state;
	};
