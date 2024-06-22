import { getSettings, useSettings } from './model/selectors/getSettings';
import {
	settingsActions,
	settingsReducer,
	useSettingsActions,
} from './model/slice/settings.slice';
import {
	SettingsState,
	SettingsStateKey,
} from './model/types/settings-state.type';

export {
	getSettings,
	settingsActions,
	settingsReducer,
	useSettings,
	useSettingsActions,
};

export type { SettingsState, SettingsStateKey };
