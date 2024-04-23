import { ProductState } from '@/entities/products';
import { UserState } from '@/entities/user';
import { LoginState } from '@/features/auth';
import { SearchState } from '@/features/search';
import { SettingsState } from '@/features/settings';
import { SortState } from '@/features/sorts';
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

	// Async reducers
	sort?: SortState;
	loginForm?: LoginState;
	search?: SearchState;
	product?: ProductState;
}

export type RootStateKey = keyof RootState;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<RootState>;
	reduce: (state: any, action: UnknownAction) => RootState;
	add: (key: RootStateKey, reducer: Reducer) => void;
	remove: (key: RootStateKey) => void;
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
