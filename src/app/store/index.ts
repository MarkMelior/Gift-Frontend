import { Providers } from '../providers';
import { AppDispatch, createReduxStore } from './config/store';
import {
	ReduxStoreWithManager,
	RootState,
	RootStateKey,
	ThunkConfig,
} from './config/store.type';
import { StoreProvider } from './ui/store-provider';

export { Providers, StoreProvider, createReduxStore };

export type {
	AppDispatch,
	ReduxStoreWithManager,
	RootState,
	RootStateKey,
	ThunkConfig,
};
