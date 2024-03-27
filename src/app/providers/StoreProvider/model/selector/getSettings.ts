/* eslint-disable indent */
import { RootState, SettingsStateKey } from '@/app/providers/StoreProvider';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { initialState } from '../slice/settingsSlice';

export const getSettings =
	<T = boolean>(action: SettingsStateKey) =>
	(state: RootState): T => {
		if (typeof window !== 'undefined') {
			const storedSettings = localStorage.getItem(LocalstorageKeys.SETTINGS);

			return storedSettings
				? (JSON.parse(storedSettings)[action] as T)
				: (initialState[action] as T);
		}

		return (state.settings[action] as T) || (initialState[action] as T);
	};
