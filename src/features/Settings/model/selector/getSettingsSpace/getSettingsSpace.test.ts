import { RootState } from '@/app/providers/StoreProvider';
import { SettingsState } from '../../types/settingsState';
import { getSettingsSpace } from './getSettingsSpace';

describe('getSettingsSpace.test', () => {
	test('should return initial state', () => {
		const initialState: Partial<SettingsState> = {
			space: false,
		};

		const state: Partial<RootState> = {
			settings: initialState as SettingsState,
		};

		expect(getSettingsSpace(state as RootState)).toEqual(false);
	});

	test('should work with empty state', () => {
		const state: Partial<RootState> = {};

		expect(getSettingsSpace(state as RootState)).toEqual(undefined);
	});
});
