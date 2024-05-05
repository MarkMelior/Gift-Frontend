import { getGlobalIsLoading } from './model/selectors/getGlobalIsLoading';
import { getSettings } from './model/selectors/getSettings';
import { getSettingsCurrency } from './model/selectors/getSettingsCurrency';
import { getSettingsOptimization } from './model/selectors/getSettingsOptimization';
import { getSettingsSpace } from './model/selectors/getSettingsSpace';
import { settingsActions, settingsReducer } from './model/slice/settings.slice';
import {
	SettingsState,
	SettingsStateKey,
} from './model/types/settings-state.type';

export {
	getGlobalIsLoading,
	getSettings,
	getSettingsCurrency,
	getSettingsOptimization,
	getSettingsSpace,
	settingsActions,
	settingsReducer,
};

export type { SettingsState, SettingsStateKey };
