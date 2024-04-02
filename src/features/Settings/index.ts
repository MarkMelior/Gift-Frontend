import { getSettings } from './model/selector/getSettings/getSettings';
import { getSettingsCurrency } from './model/selector/getSettingsCurrency/getSettingsCurrency';
import { getSettingsOptimization } from './model/selector/getSettingsOptimization/getSettingsOptimization';
import { getSettingsSpace } from './model/selector/getSettingsSpace/getSettingsSpace';
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
