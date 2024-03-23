// import { RootState } from '@/app/providers/StoreProvider';
// import { LocalstorageKeys } from '@/shared/const/localstorage';

// export const getEffectValue = (state?: RootState) => {
// 	const defaultState = true;

// 	if (typeof window !== 'undefined') {
// 		const data = localStorage.getItem(LocalstorageKeys.EFFECTS);
// 		return data ? JSON.parse(data) : defaultState;
// 	}

// 	return state?.settings.effects;
// };
