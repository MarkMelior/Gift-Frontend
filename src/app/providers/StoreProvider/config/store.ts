import { userReducer } from '@/entities/User';
import { settingsReducer } from '@/features/Settings';
import { $api } from '@/shared/api/api';
import type {
	ReducerFromReducersMapObject,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { RootState, ThunkExtraArg } from './RootState';
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

	const extraArgument: ThunkExtraArg = {
		api: $api,
	};

	const store = configureStore<RootState>({
		reducer: reducerManager.reduce as ReducerFromReducersMapObject<RootState>,
		devTools: JSON.parse(process.env.IS_DEV),
		preloadedState: initialState,
		// @ts-ignore fix
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ thunk: { extraArgument } }),
	});

	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
