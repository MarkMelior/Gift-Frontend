import {
	ReduxStoreWithManager,
	RootState,
	RootStateKey,
} from '@/app/providers/StoreProvider';
import type { Reducer } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

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
	const dispatch = useDispatch();
	const store = useStore() as ReduxStoreWithManager;

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]) => {
			store.reducerManager.add(name as RootStateKey, reducer);
			dispatch({ type: `@@INIT ${name} reducer` });
		});

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name, reducer]) => {
					store.reducerManager.remove(name as RootStateKey);
					dispatch({
						type: `@@DESTROY ${name} reducer`,
					});
				});
			}
		};
		// eslint-disable-next-line
	}, []);

	return <>{children}</>;
};
