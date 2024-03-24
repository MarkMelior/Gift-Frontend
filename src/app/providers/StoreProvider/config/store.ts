import { sortSlice } from '@/widgets/Sorts';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '..';
import { favoritesSlice } from '../model/slice/favoritesSlice';
import { settingsSlice } from '../model/slice/settingsSlice';

export const createReduxStore = (initialState?: RootState) => {
	return configureStore<RootState>({
		reducer: {
			settings: settingsSlice.reducer,
			favorites: favoritesSlice.reducer,
			sort: sortSlice.reducer,
		},
		preloadedState: initialState,
		devTools: process.env.NODE_ENV === 'development', // FIX: ReferenceError: IS_DEV is not defined
	});
};
