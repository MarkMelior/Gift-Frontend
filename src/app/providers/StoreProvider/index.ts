import { createReduxStore } from './config/store';
import { getSettings } from './model/selector/getSettings';
import { settingsActions, settingsReducer } from './model/slice/settingsSlice';
import {
	AppDispatch,
	RootState,
	SettingsState,
	SettingsStateKey,
} from './model/types/storeSchema';
import { StoreProvider } from './ui/StoreProvider';

export {
	StoreProvider,
	createReduxStore,
	getSettings,
	settingsActions,
	settingsReducer,
};

export type { AppDispatch, RootState, SettingsState, SettingsStateKey };
