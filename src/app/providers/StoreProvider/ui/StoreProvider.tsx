import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { RootState, createReduxStore } from '../config/store';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: RootState;
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children, initialState } = props;

	const store = createReduxStore(initialState as RootState);

	return <Provider store={store}>{children}</Provider>;
};
