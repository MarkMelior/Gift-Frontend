import { sortSlice } from '@/widgets/Sorts';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '..';
import { settingsSlice } from '../model/slice/settingsSlice';

export const createReduxStore = (initialState?: RootState) => {
	return configureStore<RootState>({
		reducer: {
			settings: settingsSlice.reducer,
			sort: sortSlice.reducer,
		},
		preloadedState: initialState,
		devTools: process.env.NODE_ENV === 'development', // FIX: ReferenceError: IS_DEV is not defined
	});
};
