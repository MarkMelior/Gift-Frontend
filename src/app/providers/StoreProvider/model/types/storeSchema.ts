import { Currency } from '@/shared/types/localization';
import { SortState } from '@/widgets/Sorts';
import { ReactNode } from 'react';
import { createReduxStore } from '../../config/store';

export interface RootState {
	settings: SettingsState;
	sort: SortState;
}

export interface SettingsState {
	space: boolean;
	optimization: boolean;
	currency: Currency;
}

export type SettingsStateKey = keyof SettingsState;

export interface StoreProviderProps {
	children?: ReactNode;
	initialState?: RootState;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
