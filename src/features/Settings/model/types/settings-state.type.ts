import { Currency } from '@/shared/types/localization';

export interface SettingsState {
	space: boolean;
	optimization: boolean;
	currency: Currency;
}

export type SettingsStateKey = keyof SettingsState;
