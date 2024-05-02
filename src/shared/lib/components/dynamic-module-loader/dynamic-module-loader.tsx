import { ReduxStoreWithManager, RootState, RootStateKey } from '@/app/store';
import type { Reducer } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { useAppDispatch } from '../../hooks';

interface DynamicModuleLoaderProps {
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
	children: ReactNode;
}

export type ReducersList = {
	[name in RootStateKey]?: Reducer<NonNullable<RootState[name]>>;
};

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
	children,
	reducers,
	removeAfterUnmount,
}) => {
	const dispatch = useAppDispatch();
	const store = useStore() as ReduxStoreWithManager;

	useEffect(() => {
		const mountedReducers = store.reducerManager.getMountedReducers();

		Object.entries(reducers).forEach(([name, reducer]) => {
			const mounted = mountedReducers[name as RootStateKey];

			if (!mounted) {
				store.reducerManager.add(name as RootStateKey, reducer);
				dispatch({ type: `@INIT ${name} reducer` });
			}
		});

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name, reducer]) => {
					store.reducerManager.remove(name as RootStateKey);
					dispatch({
						type: `@DESTROY ${name} reducer`,
					});
				});
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};
