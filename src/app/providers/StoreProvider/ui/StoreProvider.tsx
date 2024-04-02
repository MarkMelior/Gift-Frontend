import { RootState } from '@/app/providers/StoreProvider/config/RootState';
import { createReduxStore } from '@/app/providers/StoreProvider/config/store';
import { setLocalstorage } from '@/shared/lib/features';
import { LocalstorageKeys } from '@/shared/types/localstorage';
import type { ReducersMapObject } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: Partial<RootState>;
	asyncReducers?: Partial<ReducersMapObject<RootState>>;
}

export const StoreProvider: FC<StoreProviderProps> = ({
	children,
	initialState,
	asyncReducers,
}) => {
	const store = createReduxStore(
		initialState as RootState,
		asyncReducers as ReducersMapObject<RootState>,
	);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setLocalstorage(LocalstorageKeys.SETTINGS, store.getState().settings);
		});

		return () => {
			unsubscribe();
		};
	}, [store]);

	return <Provider store={store}>{children}</Provider>;
};
