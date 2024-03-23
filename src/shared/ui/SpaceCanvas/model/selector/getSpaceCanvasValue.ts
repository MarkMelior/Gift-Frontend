import { StateSchema } from '@/app/providers/StoreProvider';
import { LocalstorageKeys } from '@/shared/const/localstorage';

// export const getSpaceCanvasValue = (state: StateSchema) =>
// 	state.spaceCanvas.value;

export const getSpaceCanvasValue = (state?: StateSchema) => {
	if (typeof window !== 'undefined') {
		const data = localStorage.getItem(LocalstorageKeys.SPACE);
		return data ? JSON.parse(data) : state?.spaceCanvas.value;
	}
	return state?.spaceCanvas.value;
};
