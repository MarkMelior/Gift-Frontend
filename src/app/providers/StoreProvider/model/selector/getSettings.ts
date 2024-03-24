/* eslint-disable indent */
import {
	RootState,
	SettingsState,
	SettingsStateKey,
} from '@/app/providers/StoreProvider';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { initialState } from '../slice/settingsSlice';

export const getSettings =
	(action: SettingsStateKey) => (state?: RootState) => {
		if (typeof window !== 'undefined') {
			const data = localStorage.getItem(LocalstorageKeys.SETTINGS);

			if (!data) return initialState[action];

			const value: SettingsState = JSON.parse(data);

			return value[action];
		}

		return state?.settings[action];
	};
