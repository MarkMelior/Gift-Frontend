import { UserState } from '@/entities/user';
import { LoginState, RegisterState } from '@/features/auth';
import { ProductModalState } from '@/features/products';
import { rtkApi } from '@/shared/api/rtkApi';
import { SettingsState } from '@/shared/config/settings';
import { SearchState } from '@/widgets/modal-search';
import { SortState } from '@/widgets/sorts';
import type {
	EnhancedStore,
	Reducer,
	ReducersMapObject,
	UnknownAction,
} from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';

export interface RootState {
	settings: SettingsState;
	user: UserState;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

	// * Async reducers
	sort: SortState; // ! fixme
	search?: SearchState;
	loginForm?: LoginState;
	registerForm?: RegisterState;
	productModal?: ProductModalState;
}

export type RootStateKey = keyof RootState;
export type MountedReducers = OptionalRecord<RootStateKey, boolean>;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<RootState>;
	reduce: (state: any, action: UnknownAction) => RootState;
	add: (key: RootStateKey, reducer: Reducer) => void;
	remove: (key: RootStateKey) => void;
	getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<RootState> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: RootState;
}
