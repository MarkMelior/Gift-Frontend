import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/Auth';
import { settingsReducer } from '@/features/Settings';
import { sortReducer } from '@/features/Sorts';
import { setLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		settings: settingsReducer,
		sort: sortReducer,
		user: userReducer,
		loginForm: loginReducer,
	},
	devTools: process.env.NODE_ENV === 'development', // FIX: ReferenceError: IS_DEV is not defined
});

store.subscribe(() => {
	setLocalstorage(LocalstorageKeys.SETTINGS, store.getState().settings);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
