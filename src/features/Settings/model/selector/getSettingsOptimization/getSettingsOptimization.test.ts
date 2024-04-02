import { RootState } from '@/app/providers/StoreProvider';
import { SettingsState } from '../../types/settingsState';
import { getSettingsOptimization } from './getSettingsOptimization';

describe('getSettingsOptimization.test', () => {
	test('should return initial state', () => {
		const initialState: Partial<SettingsState> = {
			optimization: true,
		};

		const state: Partial<RootState> = {
			settings: initialState as SettingsState,
		};

		expect(getSettingsOptimization(state as RootState)).toEqual(true);
	});

	test('should work with empty state', () => {
		const state: Partial<RootState> = {};

		expect(getSettingsOptimization(state as RootState)).toEqual(undefined);
	});
});
