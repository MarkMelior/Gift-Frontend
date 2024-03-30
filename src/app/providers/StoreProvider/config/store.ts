import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/Auth';
import { sortReducer } from '@/widgets/Sorts';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '..';
import { settingsReducer } from '../model/slice/settingsSlice';

export const createReduxStore = (initialState?: RootState) => {
	return configureStore<RootState>({
		reducer: {
			settings: settingsReducer,
			sort: sortReducer,
			user: userReducer,
			loginForm: loginReducer,
		},
		preloadedState: initialState,
		devTools: process.env.NODE_ENV === 'development', // FIX: ReferenceError: IS_DEV is not defined
	});
};
