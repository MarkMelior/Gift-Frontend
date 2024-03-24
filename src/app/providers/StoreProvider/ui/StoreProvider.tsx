import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { RootState, StoreProviderProps } from '../model/types/storeSchema';

export const StoreProvider = (props: StoreProviderProps) => {
	const { children, initialState } = props;

	const store = createReduxStore(initialState as RootState);

	return <Provider store={store}>{children}</Provider>;
};
