// import { RootState } from '@/app/providers/StoreProvider';
// import { LocalstorageKeys } from '@/shared/const/localstorage';

// export const getAnimationValue = (state?: RootState) => {
// 	const defaultState = true;

// 	if (typeof window !== 'undefined') {
// 		const data = localStorage.getItem(LocalstorageKeys.ANIMATIONS);
// 		return data ? JSON.parse(data) : defaultState;
// 	}

// 	return state?.settings.animations;
// };
