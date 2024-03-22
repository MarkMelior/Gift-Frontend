import { spaceSlice } from '@/shared/ui/SpaceCanvas';
import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
	return configureStore<StateSchema>({
		reducer: {
			spaceCanvas: spaceSlice.reducer,
		},
		// devTools: IS_DEV,
		preloadedState: initialState,
	});
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
