import { UserState } from '@/entities/User';
import { LoginState } from '@/features/Auth';
import { SearchState } from '@/features/Search';
import { SettingsState } from '@/features/Settings';
import { SortState } from '@/features/Sorts';
import type {
	EnhancedStore,
	Reducer,
	ReducersMapObject,
	UnknownAction,
} from '@reduxjs/toolkit';

export interface RootState {
	settings: SettingsState;
	user: UserState;

	// Async reducers
	sort?: SortState;
	loginForm?: LoginState;
	search?: SearchState;
}

export type RootStateKey = keyof RootState;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<RootState>;
	reduce: (state: RootState, action: UnknownAction) => Partial<RootState>;
	add: (key: RootStateKey, reducer: Reducer) => void;
	remove: (key: RootStateKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<RootState> {
	reducerManager: ReducerManager;
}
