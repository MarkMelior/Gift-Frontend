import { RootState } from '@/app/providers/StoreProvider/config/RootState';
import { createReduxStore } from '@/app/providers/StoreProvider/config/store';
import { SettingsState } from '@/features/Settings';
import { getLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import type { ReducersMapObject } from '@reduxjs/toolkit';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

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
	};

	const store = createReduxStore(
		initialState as RootState,
		asyncReducers as ReducersMapObject<RootState>,
	);

	return <Provider store={store}>{children}</Provider>;
};
