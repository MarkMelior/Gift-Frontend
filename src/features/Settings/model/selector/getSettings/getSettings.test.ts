import { RootState } from '@/app/providers/StoreProvider';
import { SettingsState } from '../../types/settingsState';
import { getSettings } from './getSettings';

describe('getSettings.test', () => {
	test('should return initial state', () => {
		const initialState: SettingsState = {
			space: false,
			optimization: false,
			currency: 'RUB',
		};

		const state: Partial<RootState> = {
			settings: initialState,
		};

		expect(getSettings(state as RootState)).toEqual(initialState);
	});

	test('should work with empty state', () => {
		const state: Partial<RootState> = {};

		expect(getSettings(state as RootState)).toEqual(undefined);
	});
});
