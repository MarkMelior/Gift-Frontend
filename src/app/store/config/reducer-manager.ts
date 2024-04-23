import type { ReducersMapObject } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { ReducerManager, RootState, RootStateKey } from './store.type';

export function createReducerManager(
	initialReducers: ReducersMapObject<RootState>,
): ReducerManager {
	const reducers = { ...initialReducers };
	let combinedReducer = combineReducers(reducers);
	let keysToRemove: RootStateKey[] = [];

	return {
		getReducerMap: () => reducers,
		reduce: (state, action) => {
			if (keysToRemove.length > 0) {
				state = { ...state };
				for (let key of keysToRemove) {
					delete state[key];
				}
				keysToRemove = [];
			}
			return combinedReducer(state, action);
		},
		add: (key, reducer) => {
			if (!key || reducers[key]) {
				return;
			}
			reducers[key] = reducer;
			combinedReducer = combineReducers(reducers);
		},
		remove: (key) => {
			if (!key || !reducers[key]) {
				return;
			}

			delete reducers[key];
			keysToRemove.push(key);
			combinedReducer = combineReducers(reducers);
		},
	};
}
