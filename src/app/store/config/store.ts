import { userReducer } from '@/entities/user';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { settingsReducer } from '@/shared/config/settings';
import { setLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { sortReducer } from '@/widgets/sorts';
import type { ReducersMapObject } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { loaderMiddleware } from './loader-middleware';
import { createReducerManager } from './reducer-manager';
import { RootState, ThunkExtraArg } from './store.type';

export function createReduxStore(
	initialState?: RootState,
	asyncReducers?: ReducersMapObject<RootState>,
) {
	const rootReducers: ReducersMapObject<RootState> = {
		...asyncReducers,
		settings: settingsReducer,
		user: userReducer,
		sort: sortReducer, // ! fixme
		[rtkApi.reducerPath]: rtkApi.reducer,
	};

	const reducerManager = createReducerManager(rootReducers);

	const extraArgument: ThunkExtraArg = {
		api: $api,
	};

	const store = configureStore({
		reducer: reducerManager.reduce,
		devTools: process.env.NODE_ENV === 'development',
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ thunk: { extraArgument } })
				.concat(rtkApi.middleware)
				.concat(loaderMiddleware),
	});

	store.subscribe(() => {
		setLocalstorage(LocalstorageKeys.SETTINGS, store.getState().settings);
	});

	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
