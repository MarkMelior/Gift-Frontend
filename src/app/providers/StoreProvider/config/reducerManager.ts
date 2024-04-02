import type {
	Reducer,
	ReducersMapObject,
	UnknownAction,
} from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { ReducerManager, RootState, RootStateKey } from './RootState';

export function createReducerManager(
	initialReducers: ReducersMapObject<RootState>,
): ReducerManager {
	const reducers = { ...initialReducers };
	let combinedReducer = combineReducers(reducers);
	let keysToRemove: RootStateKey[] = [];

	return {
		getReducerMap: () => reducers,
		reduce: (state: RootState, action: UnknownAction) => {
			if (keysToRemove.length > 0) {
				state = { ...state };
				for (let key of keysToRemove) {
					delete state[key];
				}
				keysToRemove = [];
			}

			// @ts-ignore fix
			return combinedReducer(state, action);
		},
		add: (key: RootStateKey, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return;
			}
			reducers[key] = reducer;
			combinedReducer = combineReducers(reducers);
		},
		remove: (key: RootStateKey) => {
			if (!key || !reducers[key]) {
				return;
			}

			delete reducers[key];
			keysToRemove.push(key);
			combinedReducer = combineReducers(reducers);
		},
	};
}
