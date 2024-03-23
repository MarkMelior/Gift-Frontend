// import { RootState } from '@/app/providers/StoreProvider';
// import { LocalstorageKeys } from '@/shared/const/localstorage';

// export const getSpaceValue = (state?: RootState) => {
// 	const defaultState = false;

// 	if (typeof window !== 'undefined') {
// 		const data = localStorage.getItem(LocalstorageKeys.SPACE);
// 		return data ? JSON.parse(data) : defaultState;
// 	}

// 	return state?.settings.space;
// };
