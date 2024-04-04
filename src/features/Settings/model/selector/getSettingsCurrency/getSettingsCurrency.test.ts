import { RootState } from '@/app/providers/StoreProvider';
import { SettingsState } from '../../types/settingsState';
import { getSettingsCurrency } from './getSettingsCurrency';

describe('getSettingsCurrency.test', () => {
	test('should return initial state', () => {
		const initialState: Partial<SettingsState> = {
			currency: 'RUB',
		};

		const state: Partial<RootState> = {
			settings: initialState as SettingsState,
		};

		expect(getSettingsCurrency(state as RootState)).toEqual('RUB');
	});
});
