import {
	ReduxStoreWithManager,
	RootState,
	RootStateKey,
	ThunkConfig,
} from './config/RootState';
import { AppDispatch, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export { StoreProvider, createReduxStore };

export type {
	AppDispatch,
	ReduxStoreWithManager,
	RootState,
	RootStateKey,
	ThunkConfig,
};
