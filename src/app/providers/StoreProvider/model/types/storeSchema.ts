import { Currency } from '@/shared/types/localization';
import { ReactNode } from 'react';
import { createReduxStore } from '../../config/store';

export interface RootState {
	settings: SettingsState;
	favorites: number[];
}

export interface SettingsState {
	space: boolean;
	animations: boolean;
	effects: boolean;
	currency: Currency;
}

export type SettingsStateKey = keyof SettingsState;

export interface StoreProviderProps {
	children?: ReactNode;
	initialState?: RootState;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
