import { SettingsState } from '@/entities/settings';
import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import { AuthResponse } from '@melior-gift/zod-contracts';
import type { ReducersMapObject } from '@reduxjs/toolkit';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { RootState } from '../config/store.type';

interface StoreProviderProps {
	children?: ReactNode;
	// initialState?: DeepPartial<RootState>;
	asyncReducers?: DeepPartial<ReducersMapObject<RootState>>;
}

export const StoreProvider: FC<StoreProviderProps> = ({
	children,
	// initialState,
	asyncReducers,
}) => {
	const initialState: DeepPartial<RootState> = {
		settings: getLocalstorage<SettingsState>(LocalstorageKeys.SETTINGS),
		user: {
			access_token: getLocalstorage<AuthResponse>(LocalstorageKeys.USER)
				?.access_token,
		},
	};

	const store = createReduxStore(
		initialState as RootState,
		asyncReducers as ReducersMapObject<RootState>,
	);

	return <Provider store={store}>{children}</Provider>;
};
