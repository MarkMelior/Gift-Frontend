import { configureStore } from '@reduxjs/toolkit';
import { SettingsState, settingsSlice } from './slice/settingsSlice';

export interface RootState {
	settings: SettingsState;
}

export const createReduxStore = (initialState?: RootState) => {
	return configureStore<RootState>({
		reducer: {
			settings: settingsSlice.reducer,
		},
		preloadedState: initialState,
		devTools: process.env.NODE_ENV === 'development', // FIX: ReferenceError: IS_DEV is not defined
	});
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
