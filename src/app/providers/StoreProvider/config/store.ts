import { userReducer } from '@/entities/User';
import { settingsReducer } from '@/features/Settings';
import type {
	ReducerFromReducersMapObject,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from './RootState';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
	initialState?: RootState,
	asyncReducers?: ReducersMapObject<RootState>,
) {
	const rootReducers: ReducersMapObject<RootState> = {
		...asyncReducers,
		settings: settingsReducer,
		user: userReducer,
	};

	const reducerManager = createReducerManager(rootReducers);

	const store = configureStore<RootState>({
		reducer: reducerManager.reduce as ReducerFromReducersMapObject<RootState>,
		devTools: process.env.NODE_ENV === 'development', // FIX: ReferenceError: IS_DEV is not defined
		preloadedState: initialState,
	});

	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
