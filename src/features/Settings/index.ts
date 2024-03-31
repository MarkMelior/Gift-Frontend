import { getSettings } from './model/selector/getSettings';
import { getSettingsCurrency } from './model/selector/getSettingsCurrency';
import { getSettingsOptimization } from './model/selector/getSettingsOptimization';
import { getSettingsSpace } from './model/selector/getSettingsSpace';
import { settingsActions, settingsReducer } from './model/slice/settingsSlice';
import { SettingsState, SettingsStateKey } from './model/types/settingsState';

export {
	getSettings,
	getSettingsCurrency,
	getSettingsOptimization,
	getSettingsSpace,
	settingsActions,
	settingsReducer,
};

export type { SettingsState, SettingsStateKey };
