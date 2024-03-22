import { StateSchema } from '@/app/providers/StoreProvider';

export const getSpaceCanvasValue = (state: StateSchema) =>
	state.spaceCanvas.value;
