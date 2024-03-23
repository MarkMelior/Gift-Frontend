import { getSettings } from './config/selector/getSettings';
import {
	SettingsState,
	SettingsStateKey,
	settingsSlice,
} from './config/slice/settingsSlice';
import type { AppDispatch, RootState } from './config/store';
import { createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
	RootState,
	StoreProvider,
	createReduxStore,
	getSettings,
	settingsSlice,
};

export type { AppDispatch, SettingsState, SettingsStateKey };
