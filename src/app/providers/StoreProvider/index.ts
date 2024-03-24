import { createReduxStore } from './config/store';
import { getSettings } from './model/selector/getSettings';
import { settingsSlice } from './model/slice/settingsSlice';
import {
	AppDispatch,
	RootState,
	SettingsState,
	SettingsStateKey,
} from './model/types/storeSchema';
import { StoreProvider } from './ui/StoreProvider';

export { StoreProvider, createReduxStore, getSettings, settingsSlice };

export type { AppDispatch, RootState, SettingsState, SettingsStateKey };
